console.log('running mille-feuille');

const db_service = require('./services/db_service.js');
const twitter_service = require('./services/twitter_service.js');
const fs = require('fs');

require('dotenv').config();

console.log('loaded configs');

(async () => {

    console.log('running main function');

    try {
        let videoIndex = await db_service.getVideoIndex();
        let index = videoIndex.Index;
        console.log(index);

        const directoryPath = 'slices';
        fs.readdir(directoryPath, async function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 

            console.log('readdir');
            console.log(index);

            let i = 0;
            //listing all files using forEach
            let selectedFile;
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                //console.log(i + ' ' + index + ' ' + file); 
                if (i == index) {
                    console.log('found');
                    console.log(file);

                    selectedFile = file;                    
                }
                if (file.includes('.mp4')) {
                    i++;
                }
            });

            await twitter_service.uploadMedia(selectedFile, index);

            await db_service.saveVideoIndex(index + 1);

        });
        

    } catch (e) {
        // Deal with the fact the chain failed
        console.log(e);
    }
})();