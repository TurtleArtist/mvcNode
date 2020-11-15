var express = require("express");
var routeur = express.Router();
const twig = require("twig");
const livreController = require("../controllers/livre.controller");

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


routeur.get("/", livreController.livres_affichage)
routeur.post("/", upload.single("image"), livreController.livres_ajout);
routeur.get("/:id", livreController.livre_affichage);

//Modification d'un livre (formulaire)
routeur.get("/modification/:id", livreController.livres_modification)

routeur.post("/modificationServer", livreController.livres_modification_validation);

routeur.post("/updateImage", upload.single("image"), livreController.livres_modification_validation_image);


routeur.post("/delete/:id", livreController.livres_suppression);

module.exports = routeur;