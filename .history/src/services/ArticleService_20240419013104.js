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

const FilterTopicArticle = (limit = 4, page = 0, filterStatus, filterTopic, filterTitle) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queryConditions = {};
            if (filterStatus) {
                queryConditions[filterStatus[0]] = filterStatus[1];
            }
            else if (filterTopic) {
                queryConditions[filterTopic[0]] = filterTopic[1];
            }
            else if (filterTitle) {
                queryConditions[filterTitle[0]] = { '$regex': filterTitle[1], '$options': 'i' };
            }

            const totalArticle = await Article.countDocuments(queryConditions);
            const allArticle = await Article.find(queryConditions).limit(limit).skip(page * limit);

            // Calculation for approved articles
            const totalApproved = await Article.countDocuments({ status: 'approved' });
            const totalPageApproved = Math.ceil(totalApproved / limit);

            resolve({
                status: 'OK',
                message: 'Success',
                data: allArticle,
                total: totalArticle,
                totalApproved: totalApproved,
                totalPageApproved: totalPageApproved,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalArticle / limit),
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

const getPaginationArticle = (limit = 4, page = 0, filterStatus, filterName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queryConditions = {};
            if (filterStatus) {
                queryConditions[filterStatus[0]] = filterStatus[1];
            }
            if (filterName) {
                queryConditions[filterName[0]] = { '$regex': filterName[1], '$options': 'i' };
            }

            const totalArticle = await Article.countDocuments(queryConditions);
            const allArticle = await Article.find(queryConditions).limit(limit).skip(page * limit);

            // Calculation for approved articles
            const totalApproved = await Article.countDocuments({ status: 'approved' });
            const totalPageApproved = Math.ceil(totalApproved / limit);

            resolve({
                status: 'OK',
                message: 'Success',
                data: allArticle,
                total: totalArticle,
                totalApproved: totalApproved,
                totalPageApproved: totalPageApproved,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalArticle / limit),
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
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
    FilterTopicArticle,
    getPaginationArticle
}