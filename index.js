const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Продаю яйца(анзул пидор)')
})

app.listen(port, () => {
  console.log(`Сервер запущен http://localhost:${port}`)
})