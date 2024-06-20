const ArticleService = require('../services/ArticleService')

// const createArticle = async(req, res) => {
//     try {
//         const { title, content, document, user_id, submission_date, status, views, commentsCount, ratingsAverage , ratingsCount, topic_id, images, comments} = req.body;
        
//         if (!title || !content || !document || !user_id || !submission_date || !status || !topic_id || !Array.isArray(images)) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'All fields are required'
//             });
//         }
//         const response = await ArticleService.createArticle(req.body);
//         return res.status(200).json(response);
//     } catch (e) {
//         console.log('controller', e)
//         return res.status(500).json({
//             status: 'ERR',
//             message: 'Server error',
//             error: e.message
//         });
//     }
// };

// const createArticle = async (req, res) => {
//     try {
//         // Destructure text fields from req.body
//         const { title, content, user_id, submission_date, status, views, commentsCount, ratingsAverage, ratingsCount, topic_id, images, comments } = req.body;

//         // console.log(req.body);
//         // console.log(req.files);

//         // if (req.docHtmlContent) {
//         //     console.log('Converted HTML:', req.docHtmlContent);
//         //     // Here, you could save req.docHtmlContent to your database, 
//         //     // attach it to a response, or perform other logic as needed
//         // }

//         // Validate required fields (adjust according to your actual requirements)
//         if (!title || !content || !user_id || !submission_date || !status || !topic_id) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'All required fields must be filled'
//             });
//         }
        
//         // Images and documents are not directly in req.body; they are in req.files
//         // This structure depends on how you've configured multer; adjust keys as needed
//         const files = req.files;
        
//         // Now, call your service function, passing both the body data and the files
//         const response = await ArticleService.createArticle({ title, content, user_id, submission_date, status, views, commentsCount, ratingsAverage, ratingsCount, topic_id, images, comments, docHtmlContent: req.docHtmlContent }, files);

//         // Assuming your service function returns the file names or paths for image and document
//         const { imageFileName, documentFileName } = response;

//         // Send response with relative paths to image and document
//         return res.status(200).json({
//             status: 'OK',
//             message: 'Article successfully created',
//             data: response,
//             htmlContent: req.docHtmlContent,
//             imagePath: 'uploads/' + imageFileName, // Relative path to image
//             documentPath: 'uploads/' + documentFileName // Relative path to document
//         });

//     } catch (e) {
//         console.error('Controller Error:', e);
//         return res.status(500).json({
//             status: 'ERR',
//             message: 'Server error',
//             error: e.message
//         });
//     }
// };

const createArticle = async (req, res) => {
    try {
        // Destructure text fields from req.body
        const { title, content, user_id, submission_date, status, views, commentsCount, ratingsAverage, ratingsCount, topic_id, comments } = req.body;

        // Validate required fields (adjust according to your actual requirements)
        if (!title || !content || !user_id || !submission_date || !status || !topic_id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All required fields must be filled'
            });
        }
        
        // Images and documents are not directly in req.body; they are in req.files
        // This structure depends on how you've configured multer; adjust keys as needed
        const files = req.files;
        
        // Now, call your service function, passing both the body data and the files
        const response = await ArticleService.createArticle({ title, content, user_id, submission_date, status, views, commentsCount, ratingsAverage, ratingsCount, topic_id, comments, docHtmlContent: req.docHtmlContent }, files);

        return res.status(200).json({
            status: 'OK',
            message: 'Article successfully created',
            data: response, // Assuming `response` contains the article data
            htmlContent: req.docHtmlContent // Include the converted HTML content
        });

    } catch (e) {
        console.error('Controller Error:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Server error',
            error: e.message
        });
    }
};

const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        // Include docHtmlContent in the destructured assignment if you expect it in the body, or pass req.docHtmlContent directly.
        const updatedData = { ...req.body, docHtmlContent: req.docHtmlContent };

        const files = req.files; // Handle files if they are part of the update

        const response = await ArticleService.updateArticle(articleId, updatedData, files);

        return res.status(200).json(response);
    } catch (e) {
        console.error('Controller Error:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Server error',
            error: e.message
        });
    }
};



const deleteArticle = async(req, res) => {
    try {
        const ArticleId = req.params.id
        // const token = req.headers
        if (!ArticleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ArticleId is required'
            })
        }
        const response = await ArticleService.deleteArticle(ArticleId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllArticle = async(req, res) => {
    try {
        const response = await ArticleService.getAllArticle()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const FilterTopicArticle = async (req, res) => {
    const {  limit, page, filterStatus, filterTopic, filterTitle } = req.query;
    try {
        const response = await ArticleService.FilterTopicArticle(limit, page, filterStatus, filterTopic, filterTitle);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Pagination Error:', error);
        return res.status(500).json({
            message: 'Error fetching paginated articles',
            error: error.message
        });
    }
}

const getPaginationArticle = async (req, res) => {
    const { limit, page, filterStatus, filterName } = req.query;
    try {
        const response = await ArticleService.getPaginationArticle(Number(limit), Number(page), filterStatus, filterName);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Pagination Error:', error);
        return res.status(500).json({
            message: 'Error fetching paginated articles',
            error: error.message
        });
    }
}

const getDetailsArticle = async (req, res) => {
    try {
        const ArticleId = req.params.id
        if (!ArticleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ArticleId is required'
            })
        }
        const response = await ArticleService.getDetailsArticle(ArticleId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticle,
    getDetailsArticle,
    PaginationArticle,
    getPaginationArticle
}