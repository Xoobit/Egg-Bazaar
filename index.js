//Импортируем модуль с фреймворком
const express = require('express')
//Импортируем модуль path для работы с путями
const path = require("path")

//Импортируем функцию из файла parser, подробней смотреть в самом файле
const file2table = require("./parser")

//Инициализируем приложение
const app = express()
//Устанавливаем порт
const port = 3000
//Указываем папку где хранятся html странички
const PAGES_FOLFER = path.join(__dirname, "pages")

//Указываем папку со статическими файлами
app.use('/static', express.static('static'))
//Используем шаблонизатор hbs
//Шаблонизатор нужен для передачи данных из приложения на страничку
app.set('view engine', 'hbs');
//Указываем расширения файла с шаблоном, в нашем случае html
app.engine('html', require('hbs').__express);


//Назначаем функцию которая будет выполнятся когда кто-нибудь обращается к 
//главной странице сайта /
app.get('/', (req, res) => {
  //Используем функцию для получения html таблицы из файла, обрезаем пробелы на всякий случай
  const table = file2table().trim()
  //Берем шаблон index.html из папки и передаем туда таблицу
  return res.render(PAGES_FOLFER+"/index.html", {table})
})

//Запуск приложения 
app.listen(port, () => {
  console.log(`Сервер запущен http://localhost:${port}`)
})