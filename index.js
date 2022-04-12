const memeMaker = require('@erickwendel/meme-maker');
const express = require('express');
const words = require('./words')
resolve = require('path').resolve

const app = express();
const port = 4200;

const filePath = './img/cheadle.jpg';
const outputfilePath = "./cheadle-meme.jpg";

app.get('/', async (req, res) => {
    var rand = getRandomInt(0, words.length);

    createMeme(words[rand]).then(() => {
        res.sendFile(resolve(outputfilePath));
    }).catch((err) => {
        res.sendFile(filePath);
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function createMeme(word) {
    await memeMaker({
        image: filePath,       // Required
        outfile: outputfilePath,  // Required
        topText: 'DON CHEADLE WORD OF THE DAY',     // Required
        bottomText: word,            // Optional
        fontSize: 50,                   // Optional
        fontFill: '#FFF',               // Optional
        textPos: 'center',              // Optional
        strokeColor: '#000',            // Optional
        strokeWeight: 2                 // Optional
    });
}
