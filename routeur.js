var express = require("express");
var routeur = express.Router();
const twig = require("twig");
//const mongoose = require("mongoose");
//const livreSchema =require("./models/livres.modele")
//const fs = require("fs");
const livreController = require("./controllers/livre.controller");

const multer = require("multer");

const storage = multer.diskStorage({
    destination : (requete, file, cb)=> {
        cb(null, "./public/images/")
    },
    filename : (requete, file, cb)=> {
        var dateMili = Date.now();
        cb(null, dateMili+"-"+ Math.round(Math.random() * 10000)+"-"+file.originalname)
    }
});
const fileFilter = (requete, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true)
    } else {
        cb(new Error("l'image n'est pas acceptée"),false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

routeur.get("/", (requete, reponse) =>{
    reponse.render("accueil.html.twig")
})

routeur.get("/livres", livreController.livres_affichage)
routeur.post("/livres", upload.single("image"), livreController.livres_ajout);
routeur.get("/livres/:id", livreController.livre_affichage);

//Modification d'un livre (formulaire)
routeur.get("/livres/modification/:id", livreController.livres_modification)

routeur.post("/livres/modificationServer", livreController.livres_modification_validation);

routeur.post("/livres/updateImage", upload.single("image"), livreController.livres_modification_validation_image);


routeur.post("/livres/delete/:id", livreController.livres_suppression);

routeur.use((requete,reponse,suite) => {
    const error = new Error("Page non trouvée");
    error.status= 404;
    suite(error);
})

routeur.use((error,requete,reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
})

module.exports = routeur;