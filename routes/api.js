var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;

var ObjectID = require('mongodb').ObjectID;

var localMongo = 'mongodb://127.0.0.1:27017/rtd';
var MongoUrl = process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : localMongo;

exports.findAll = function (req, res){
	var collectionName = req.params.collection;
	MongoClient.connect(MongoUrl, function(err, db) {
		if(err) throw err;
		db.collection(collectionName).find({})
		.limit(10)
		.toArray(function(err, docs) {
			res.send(docs);
		});
	});
};

exports.findById = function (req, res){
	var collectionName = req.params.collection;
	console.log(collectionName);
	//if(collectionName !== 'javascripts' && collectionName !== 'stylesheets'){
		var id = req.params.id;
		MongoClient.connect(MongoUrl, function(err, db) {
			if(err) throw err;
			db.collection(collectionName)
			.findOne({'_id' : new ObjectID(id)},
				function(err, doc){
					res.send(doc);
				});
			});
	//	}
};

exports.findByParameter = function (req, res){
	var collectionName = req.params.collection;
	var parameter = req.params.parameter;
	var value = req.params.value;
	var pair = {};
	pair[parameter] = value;
	MongoClient.connect(MongoUrl, function(err, db) {
		if(err) throw err;
		db.collection(collectionName).find(pair)
		.limit(10)
		.toArray(function(err, docs) {
			res.send(docs);
		});
	});
};

exports.getCollectionData = function (req, res){
	MongoClient.connect(MongoUrl, function(err, db) {
		if(err) throw err;
		db.collectionNames(function(err, collections){
			res.send(collections);
		});
	});
};
