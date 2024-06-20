const UserController = require('./UserController');
const CommentController = require('./CommentController');
const ArticleController = require('./ArticleController');
const FacultyController = require('./FacultyController');
const ImageController = require('./ImageController');

const ArticleRouter = (app) => {
    app.use("/article/create", ArticleController)
    app.use("/article/update", CommentController)
    app.use("/article/get-details", FacultyController)
    app.use("/article/delete", ImageController)
    app.use("/article/get-all", UserController)
}

export default ArticleRouter