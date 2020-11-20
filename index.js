express = require("express")
app = express()
path = __dirname + '/templates/'
app.use(express.static('static'))
views = require('./views')
app.set("view engine", "ejs")
app.get("/obj/:id/", views.arcObject)
app.get("/list/:id/", views.listObjects)
app.get("/", views.main)
app.use("*", views.error404)
port = process.env.PORT || 3000
app.listen(port, () => {
	console.log("Listening on " + port)
})
