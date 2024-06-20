

const routes = (app) => {
    app.use("/api/article", ArticleRouter)
    app.use("/api/comment", CommentRouter)
    app.use("/api/faculty", FacultyRouter)
    app.use("/api/image", ImageRouter)
    app.use("/api/user", UserRouter)
    
}

export default routes