const fs = require("fs");
const path = require("path")
const PATH_LOG = path.join(__dirname, "dism.log")


const template = {
    "date" : [0, 19], 
    "type" : [21, 43],
    "source" : [43, 54],
    "content":[54]
}


function file2table() {	
    let fileContent = fs.readFileSync(PATH_LOG, "utf8");
    return txt2log(fileContent)
}


//Преобразуем строку текста в таблицу(массив объект-строчек)
function txt2log(txt) {
    let logTable = '<table id="log"><tbody>' + 
    '<tr><th>Date</th><th>Type</th><th>Source</th><th>Content</th></tr>'
    //разделяем все строчки в массив по \n
    const rows = txt.split("\n")
    rows.forEach(row => {
        let hRow = separate(row)
        logTable += hRow
    })
    return logTable + "</tbody></table>"
} 

function separate(row) {
    //Если строка пустая или пробельная, то возвращаем пустую строку
    if (row.trim() === "") {
        return ""
    }
    let hRow = "<tr>"
    t = template
    //Если первая строчка начинается не с цифры то это строка исключение
    if(isNaN(row[0]) || row.length < 54) {
        return '<tr><td class="Date"> </td><td class="Type"> </td><td class="Source"> </td>' +
        '<td class="Content">'+ row + '</td></tr>'
    }
    hRow += '<td class="Date">'+ row.substring(t["date"][0], t["date"][1]).trim() + '</td>'
    hRow += '<td class="Type">'+ row.substring(t["type"][0], t["type"][1]).trim() + '</td>'
    hRow += '<td class="Source">'+ row.substring(t["source"][0], t["source"][1]).trim() + '</td>'
    hRow += '<td class="Contens">'+ row.substr(t["content"][0]).trim() + '</td>'
    return hRow + "</tr>"
}

module.exports = file2table