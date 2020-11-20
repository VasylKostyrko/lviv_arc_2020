// exports.main = (req, res) => {
    // // res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    // // res.end("Hello from Express! Привіт від Express!")
    // docs = []
    // docs.push({"typeName": "Церкви та монастирі"})
    // docs.push({"typeName": "Оборонні споруди"})
    // docs.push({"typeName": "Цивільна архітектупра"})
    // res.render(path + 'index', { types: docs })
// }

exports.error404 = (req,res) => {
    res.sendFile(path + '404.html')
}

exports.main = (req, res) => {
	const Datastore = require('nedb')
	const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
	db.find({ table:"arctype" }, (err, docs) => {
		docs.sort((a,b) => {return (a.id - b.id)})
		res.render(path + '/index2', { types: docs })
	})
}

exports.arcObject = (req, res) => {
	objId = parseInt(req.params.id)
	const Datastore = require('nedb')
	const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
	db.findOne({ table:"arcobj", id:objId }, (err, doc) => {
		if (err) {
			// console.log(err)
			res.sendFile(path + '404.html')
		} else {
			typeId = doc.type_id
			db.findOne({ table:"arctype", id:typeId }, (err, type) => {
				if (err) {
					res.sendFile(path + '404.html')
				} else {
					res.render(path + '/object', { object: doc, type: type })
				}
			})
		}
	})
}

exports.listObjects = (req, res) => {
	tpId = parseInt(req.params.id)
	Datastore = require('nedb')
	db = new Datastore({ filename: 'lvivarc.json', autoload: true })
	db.find({ table:"arcobj", type_id: tpId }, (err, docs) => { 
		if (docs.length == 0) {
			res.sendFile(path + '404.html')
		} else {
			db.findOne( {table:"arctype", id:tpId }, (err, doc) => {
				res.render(path + '/objects', { type: doc, objects: docs })
			})
		}
	})	
}