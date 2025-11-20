const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
let mfArray=[];
//* Mivel nem aszinkrpn kód szóval top level kód ami inoicializálódik indítás esetén
router.post('/saveData',(request,response)=>{
    const{key} = request.body;//A request.body tartalmazza a kapott JSON objectet amiből a key néven ellátott kulcs értékbárját mentjük el a key változóba
    mfArray.push({
        key:key
    });
    response.status(200).json({
        message:'sikeres mentééés'
    })
}); 
let mffArray=[];
router.post('/postdata', (request, response) => {
    const{key} = request.body;//A request.body tartalmazza a kapott JSON objectet amiből a key néven ellátott kulcs értékbárját mentjük el a key változóba
    mffArray.push({
        key:key
    });
    response.status(200).json({
        message:'sikeres mentés'
    })
});
router.get('/postdata',(request,response)=>{
    response.statusMessage(200).json({
        succes:true,
        result:mffArray
    })
});


module.exports = router;
