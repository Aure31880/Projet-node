const express = require('express');
const Sauce = require('../models/Sauces');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const item = JSON.parse(req.body.sauce);
    delete item._id;
    const sauce = new Sauce({
        ...item,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Merci votre sauce à bien été enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.liked = (req, res, next) => { };

exports.updateSauce = (req, res, next) => {
    const sauceProduct = res.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceProduct, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Votre produit à bien été modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Votre produit à bien été supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

