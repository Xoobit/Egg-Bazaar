const express = require('express')
const path = require("path")

const file2table = require("./parser")

const app = express()
const port = 3000
const PAGES_FOLFER = path.join(__dirname, "pages")


app.use('/static', express.static('static'))
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

app.get('/', (req, res) => {
  const table = file2table().trim()
  return res.render(PAGES_FOLFER+"/index.html", {table})
})

app.listen(port, () => {
  console.log(`Сервер запущен http://localhost:${port}`)
})