const Article  = require("../models/ArticleModel")
const Image  = require("../models/ImageModel")
const mongoose = require('mongoose');

// const createArticle = (newArticle) => {
//     return new Promise(async (resolve, reject) => {
//         if (!newArticle) {
//             return reject(new TypeError("New Article data is required"));
//         }

//         const { title, content, document, user_id, submission_date, status, views, commentsCount, ratingsAverage , ratingsCount, topic_id, images, comments } = newArticle;

//         try {
//             const existingArticle = await Article.findOne({ title });
//             if (existingArticle) {
//                 return resolve({
//                     status: 'ERR',
//                     message: 'title already exists'
//                 });
//             }

//             // Cast user_id to a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(user_id)) {
//                 throw new Error("Invalid user ID format");
//             }
//             newArticle.user_id = new mongoose.Types.ObjectId(user_id);

//             // Cast topic_id to a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(topic_id)) {
//                 throw new Error("Invalid topic ID format");
//             }
//             newArticle.topic_id = new mongoose.Types.ObjectId(topic_id);

//             if (!images.every(image => mongoose.Types.ObjectId.isValid(image))) {
//                 console.error('Invalid image ID format in images');
//                 throw new Error("Invalid image id format in images");
//             }
//             newArticle.images = images.map(image => new mongoose.Types.ObjectId(image));

//             if (comments) {
//                 if (!comments.every(comment => mongoose.Types.ObjectId.isValid(comment))) {
//                     console.error('Invalid comment ID format in comments');
//                     throw new Error("Invalid comment id format in comments");
//                 }
//                 newArticle.comments = comments.map(comment => new mongoose.Types.ObjectId(comment));
//             }


//             const createdArticle = await Article.create(newArticle);

//             if (createdArticle) {
//                 resolve({
//                     status: 'OK',
//                     message: 'Article successfully created',
//                     data: createdArticle
//                 });
//             }
//         } catch (e) {

//             reject({
//                 status: 'ERR',
//                 message: 'Error creating Article',
//                 error: e.message
//             });
//         }
//     });
// };

const createArticle = (newArticle, files) => {
    return new Promise(async (resolve, reject) => {
        if (!newArticle) {
            return reject(new TypeError("New Article data is required"));
        }

        const { title, content, user_id, submission_date, status, views, commentsCount, ratingsAverage, ratingsCount, topic_id, comments, docHtmlContent } = newArticle;

        try {
            const existingArticle = await Article.findOne({ title });
            if (existingArticle) {
                return resolve({
                    status: 'ERR',
                    message: 'Title already exists'
                });
            }

            // Cast user_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid user ID format");
            }
            newArticle.user_id = new mongoose.Types.ObjectId(user_id);

            // Cast topic_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(topic_id)) {
                throw new Error("Invalid topic ID format");
            }
            newArticle.topic_id = new mongoose.Types.ObjectId(topic_id);

            let documentPath = 'path/to/default/document'; // Default document path
        
            if (files.document && files.document[0]) {
                documentPath = files.document[0].path; // Update if document is uploaded
            }

            // Assuming images and comments are to be processed separately, not passed directly to Article.create
            const articleData = {
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
                // Initialize images as empty, to be updated later
                images: [],
                document: documentPath,
            };

            // Create the article without images/comments initially
            const createdArticle = await Article.create(articleData);
            const articleId = createdArticle._id;

            // Process and attach document and images
            const imageIds = [];
            if (files) {
                // Handle document upload
                if (files.document && files.document[0]) {
                    documentPath = files.document[0].path;
                }

                // Handle image uploads
                if (files.image) {
                    for (const file of files.image) {
                        const imagePath = file.path;
                        const newImage = await Image.create({ file_path: imagePath, article_id: articleId });
                        imageIds.push(newImage._id);
                    }
                }

            }


            // Update the Article with documentPath and Image IDs, if any were uploaded
            await Article.findByIdAndUpdate(articleId, { 
                $set: { document: documentPath },
                $push: { images: { $each: imageIds } } 
            });

            // Optionally, re-fetch the updated article to return it, now including the document and images
            const updatedArticle = await Article.findById(articleId).populate('images');

            resolve({
                status: 'OK',
                message: 'Article successfully created',
                data: updatedArticle
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Error creating Article',
                error: e.message
            });
        }
    });
};



const updateArticle = (id, data) => {
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

            const updateArticle = await Article.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateArticle
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

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
    getDetailsArticle
}