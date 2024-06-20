const Article  = require("../models/ArticleModel")
const Image  = require("../models/ImageModel")
const mongoose = require('mongoose');


const createArticle = async (newArticle, files) => {
    if (!newArticle) {
        throw new TypeError("New Article data is required");
    }

    const { title, content, user_id, submission_date, status, views, commentsCount, ratingsAverage, ratingsCount, topic_id, docHtmlContent } = newArticle;

    try {
        // Check if the title already exists
        const existingArticle = await Article.findOne({ title });
        if (existingArticle) {
            return {
                status: 'ERR',
                message: 'Title already exists'
            };
        }

        // Validate user_id format
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error("Invalid user ID format");
        }

        // Validate topic_id format
        if (!mongoose.Types.ObjectId.isValid(topic_id)) {
            throw new Error("Invalid topic ID format");
        }

        // Construct the relative path for the document
        let documentPath = 'path/to/default/document'; // Default document path
        if (files.document && files.document[0]) {
            documentPath = files.document[0].filename; // Store only the filename
        }

        // Initialize an array to store image filenames
        const imagePaths = [];

        // Create the article without images/comments initially
        const createdArticle = await Article.create({
            title,
            content,
            user_id: new mongoose.Types.ObjectId(user_id),
            submission_date,
            status,
            views,
            commentsCount,
            ratingsAverage,
            ratingsCount,
            topic_id: new mongoose.Types.ObjectId(topic_id),
            document: documentPath, // Store only the document filename
            docHtmlContent
        });

        const articleId = createdArticle._id; // Initialize articleId here

        // Handle image uploads
        if (files.image) {
            for (const file of files.image) {
                // Store only the filename of each image
                const imagePath = file.filename;

                // Create image documents
                const createdImage = await Image.create({
                    file_path: imagePath,
                    article_id: articleId // Use articleId directly, no need to convert to ObjectId
                });

                imagePaths.push(createdImage._id); // Store the image filename
            }
        }

        // Update the created article with image paths
        await Article.findByIdAndUpdate(articleId, { $push: { images: { $each: imagePaths } } });

        // Optionally, re-fetch the updated article to return it, now including the document and images
        const updatedArticle = await Article.findById(articleId).populate('images');

        return {
            status: 'OK',
            message: 'Article successfully created',
            data: updatedArticle
        };
    } catch (error) {
        throw {
            status: 'ERR',
            message: 'Error creating Article',
            error: error.message
        };
    }
};




const updateArticle = async (articleId, updatedData, files) => {
    try {
        // Validate articleId
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            throw new Error("Invalid article ID format");
        }

        // Check if the article exists
        const existingArticle = await Article.findById(articleId);
        if (!existingArticle) {
            return {
                status: 'ERR',
                message: 'Article not found'
            };
        }

        // Handle document update if a new document is uploaded
        let documentPath = existingArticle.document; // Default to existing document path
        if (files && files.document && files.document[0]) {
            documentPath = files.document[0].filename; // Update with new document filename
        }

        // Update the article with new data and the new document path
        const updateFields = {
            ...updatedData,
            document: documentPath,
        };

        // Initially update the article without handling images
        await Article.findByIdAndUpdate(articleId, updateFields, { new: true });

        // Handle image uploads
        if (files && files.image) {
            for (const file of files.image) {
                const imagePath = file.filename; // New image path from the upload

                // Check if an existing image for this article is present
                const existingImage = await Image.findOne({ article_id: articleId });
                if (existingImage) {
                    // Update existing image's file_path
                    await Image.findByIdAndUpdate(existingImage._id, { file_path: imagePath });
                } else {
                    // Create new image document as no existing image was found
                    await Image.create({ file_path: imagePath, article_id: articleId });
                }
            }
        }

        // Optionally, re-fetch the updated article to return it, now including the updated document and new/updated images
        const updatedArticle = await Article.findById(articleId).populate('images');

        return {
            status: 'OK',
            message: 'Article successfully updated',
            data: updatedArticle
        };
    } catch (e) {
        throw {
            status: 'ERR',
            message: 'Error updating Article',
            error: e.message
        };
    }
};



const deleteArticle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArticle = await Article.findOne({
                _id:id
            })
            if (checkArticle === null) {
                resolve({
                    status: 'ERR',
                    message: 'The article is not defined'
                })
            }

            await Article.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete article success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllArticle = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allArticle = await Article.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allArticle
            })
        } catch (e) {
            reject(e)
        }
    })
}

const PaginationArticle = async (filter) => {
    try {
        const query = {};
        if (filterStatus && filterStatus.length === 2) {
            query[filterStatus[0]] = filterStatus[1];
        }
        if (filterName && filterName.length === 2) {
            query[filterName[0]] = { '$regex': filterName[1], '$options': 'i' }; // case-insensitive search
        }

        const totalArticle = await Article.countDocuments(query); // Filtered count if filters are applied
        const articles = await Article.find(query)
            .limit(limit)
            .skip((page - 1) * limit);

        const totalApproved = await Article.countDocuments({...query, status: "approved"});

        return {
            status: 'OK',
            message: 'Success',
            data: articles,
            total: totalArticle,
            totalApproved,
            pageCurrent: page,
            totalPages: Math.ceil(totalArticle / limit),
            totalPageApproved: Math.ceil(totalApproved / limit)
        };
    } catch (error) {
        console.error('Pagination Service Error:', error);
        throw error; // Let's propagate this exception back to the controller
    }
}


const getDetailsArticle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const article = await Article.findOne({
                _id:id
            })
            if (article === null) {
                resolve({
                    status: 'ERR',
                    message: 'The article not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: article
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticle,
    getDetailsArticle,
    PaginationArticle
}