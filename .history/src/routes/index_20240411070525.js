const UserRouter = require('./UserRouter');
const CommentRouter = require('./CommentRouter');
const ArticleRouter = require('./ArticleRouter');
const FacultyRouter = require('./FacultyRouter');
const ImageRouter = require('./ImageRouter');
const TopicRouter = require('./TopicRouter');
const RateRouter = require('./RateRouter');
const { sendEmailMarking } = require('../services/EmailService');

const routes = (app) => {
    app.use("/api/article", ArticleRouter)
    app.use("/api/comment", CommentRouter)
    app.use("/api/faculty", FacultyRouter)
    app.use("/api/image", ImageRouter)
    app.use("/api/user", UserRouter)
    app.use("/api/topic", TopicRouter)
    app.use("/api/rate", RateRouter)
    app.post("/api/sendEmailMarking", (req, res) => {
        const { email, title, status, feedback } = req.body;
        sendEmailMarking(email, title, status, feedback)
            .then(() => {
                res.status(200).json({ success: true, message: "Email sent successfully" });
            })
            .catch((error) => {
                console.error("Failed to send email:", error);
                res.status(500).json({ success: false, message: "Failed to send email" });
            });
    });
    
    app.post("/api/sendEmailCUArticle", (req, res) => {
        const { email, title, name, emailUser, postDate } = req.body;
        sendEmailCUArticle(email, title, name, emailUser, postDate)
            .then(() => {
                res.status(200).json({ success: true, message: "Email sent successfully" });
            })
            .catch((error) => {
                console.error("Failed to send email:", error);
                res.status(500).json({ success: false, message: "Failed to send email" });
            });
    });
}

module.exports = routes