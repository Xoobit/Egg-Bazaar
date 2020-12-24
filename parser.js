//Импортируем модуль fs для работы с файловой системой
const fs = require("fs");
const path = require("path")
//Указываем путь до логов
const PATH_LOG = path.join(__dirname, "dism.log")

//В данном объекты храним индексы для обрезания строки лога
//Например дата хранится между 0 и 19 индексом, тип между 21 и 43
const template = {
    "date" : [0, 19], 
    "type" : [21, 43],
    "source" : [43, 54],
    "content":[54]
}


//Главная функция модуля
function file2table() {	
    //Получаем контент файла
    let fileContent = fs.readFileSync(PATH_LOG, "utf8");
    //Преобразум контент через функцию txt2log
    return txt2log(fileContent)
}


//Преобразуем строку текста в таблицу(массив объект-строчек)
function txt2log(txt) {
    let logTable = '<table id="log"><tbody>' + 
    '<tr><th>Date</th><th>Type</th><th>Source</th><th>Content</th></tr>'
    //разделяем все строчки в массив по \n
    const rows = txt.split("\n")
    //Бегаем по каждой строке используем функцию separate для преоброзования и записываем все в переменную logTable
    rows.forEach(row => {
        let hRow = separate(row)
        logTable += hRow
    })
    //Закрываем тэги и возвращаем logTable
    return logTable + "</tbody></table>"
} 


function separate(row) {
    //Если строка пустая или пробельная, то возвращаем пустую строку
    if (row.trim() === "") {
        return ""
    }
    //Начинаем с тега строки
    let hRow = "<tr>"
    //Сокращаем имя template до t
    const t = template
    //Если первая строчка начинается не с цифры то это строка исключение
    if(isNaN(row[0]) || row.length < 54) {
        return '<tr><td class="Date"> </td><td class="Type"> </td><td class="Source"> </td>' +
        '<td class="Content">'+ row + '</td></tr>'
    }
    //Запихиваем обрезанные по шаблону строки в тэги ячеек
    hRow += '<td class="Date">'+ row.substring(t["date"][0], t["date"][1]).trim() + '</td>'
    hRow += '<td class="Type">'+ row.substring(t["type"][0], t["type"][1]).trim() + '</td>'
    hRow += '<td class="Source">'+ row.substring(t["source"][0], t["source"][1]).trim() + '</td>'
    hRow += '<td class="Contens">'+ row.substr(t["content"][0]).trim() + '</td>'
    //Закрываем тэг и возвращаем html строчку
    return hRow + "</tr>"
}

//Экспортируем(делаем доступным) функцию file2table другим модулям
module.exports = file2table