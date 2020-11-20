const Datastore = require('nedb')
const dbFileName = 'lvivarc1.json'
const db = new Datastore({ filename: dbFileName, autoload: true })
const fs=require('fs')
if (fs.existsSync(dbFileName)) {
	fs.stat(dbFileName, (err, stats) => {
		if (err) {
			console.error(err)
			return
		}
		if (stats.size > 0) {
			throw("Помилка: файл " + dbFileName + " уже існує і непустий)!")
		}
	})
}
let n = 0
let data = fs.readFileSync('lvivarcSource.json', "utf8")
//console.log(data)
//return

let list = JSON.parse(data)
for (let i = 0; i < list.length; i++) {
	let obj = list[i]
	// console.log(obj)
	db.insert(obj, (err, newDoc) => { 
		n++
		if (i == list.length - 1) {
			console.log("Успішно створено файл БД " + dbFileName + " з " + n + " документами.")
		}
	})
}

