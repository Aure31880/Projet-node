const express = require('express');
const Sauce = require('../models/Sauces');
const fs = require('fs');
const { request } = require('https');

exports.createSauce = (req, res, next) => {
    const item = JSON.parse(req.body.sauce);
    delete item._id;
    const sauce = new Sauce({
        ...item,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Merci votre sauce à bien été enregistrée !' }))
        .catch(error => res.status(400).json(error));
};

exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(201).json(sauces))
        .catch(error => res.status(400).json(error))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(201).json(sauce))
        .catch(error => res.status(400).json(error));
};

exports.liked = async (req, res, next) => {
    const userId = req.body.userId;
    const itemId = req.params.id;
    if (!req.body) {
        return res.status(400).json(new Error('Bad request !'));
    }

    let liked = req.body.like;

    switch (liked) {
        case 1:
            Sauce.updateOne({ _id: itemId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
                .then(() => res.status(200).json({ message: 'J\'aime' }))
                .catch((error) => res.status(400).json({ error }))

            break;
        case 0:
            Sauce.findOne({ _id: itemId })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: itemId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                            .then(() => res.status(200).json({ message: 'J\'aime plus' }))
                            .catch((error) => res.status(400).json({ error }))
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: itemId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                            .then(() => res.status(200).json({ message: `Neutre` }))
                            .catch((error) => res.status(400).json({ error }))
                    }
                })
                .catch((error) => res.status(404).json({ error }))
            break;
        case -1:
            Sauce.updateOne({ _id: itemId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
                .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
                .catch((error) => res.status(400).json({ error }))
            break;
    }
}

exports.updateSauce = (req, res, next) => {
    const sauceProduct = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceProduct, _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Votre produit à bien été modifié !' }))
        .catch(error => res.status(403).json({ error: 'Unauthorized request.' }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Votre produit à bien été supprimé !' }))
        .catch(error => res.status(400).json(error));
};

