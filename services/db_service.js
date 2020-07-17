let MongoClient = require('mongodb').MongoClient;

module.exports = { saveVideoIndex, getVideoIndex }

async function saveVideoIndex(index) {

    let MongoClient = require('mongodb').MongoClient;

    await MongoClient.connect(process.env.MONGO_URI, async (err, db) => {

        if (err) throw err;
        let dbo = db.db(process.env.MONGO_DB);
        let videoIndex = { Index: index };
        dbo.collection("VideoIndex").insertOne(videoIndex, function(err, res) {
            if (err) throw err;
            //console.log("1 document inserted");
            db.close();            
        });

    });

}

async function getVideoIndex() {

    //console.log("getting team " + teamId);

    let videoIndex;

    const client = await MongoClient.connect(process.env.MONGO_URI);

    const db = client.db(process.env.MONGO_DB);
    //let temp = await db.collection("VideoIndex").findOne( { $query: {}, sort: { _id : -1 } } )    ;

    let temp = db.collection("VideoIndex").findOne({}, { sort: { _id: -1 }, limit: 1 });;

    videoIndex = temp;

    console.log('x' + videoIndex);

    return videoIndex;

}
