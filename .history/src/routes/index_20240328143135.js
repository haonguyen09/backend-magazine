const UserRouter = require('./UserRouter');
const CommentRouter = require('./CommentRouter');
const ArticleRouter = require('./ArticleRouter');
const FacultyRouter = require('./FacultyRouter');
const ImageRouter = require('./ImageRouter');

const routes = (app) => {
    app.use("/api/article", ArticleRouter)
    app.use("/api/comment", CommentRouter)
    app.use("/api/faculty", FacultyRouter)
    app.use("/api/image", ImageRouter)
    app.use("/api/user", UserRouter)
}

module.exports = routes