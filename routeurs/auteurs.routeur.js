var express = require("express");
var routeur = express.Router();
const twig = require("twig");

const auteurController = require("../controllers/auteur.controller");

routeur.get("/:id",auteurController.auteur_affichage);
routeur.get("/",auteurController.auteurs_affichage);
routeur.post("/",auteurController.auteurs_ajout);
routeur.post("/delete/:id",auteurController.auteur_suppresion);

//Modification d'un auteur (formulaire)
routeur.get("/modification/:id", auteurController.auteur_modification)
routeur.post("/modificationServer", auteurController.auteur_modification_validation);

//routeur.post("/updateImage", upload.single("image"), livreController.auteurs_modification_validation_image);


module.exports = routeur;