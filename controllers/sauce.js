const express = require('express');
const Sauce = require('../models/Sauces');
const fs = require('fs');
const { query } = require('express');

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

exports.liked = async (req, res, next) => {
    const userId = req.body.userId;
    const itemId = req.params.id;
    if (!req.body) {
        return res.status(400).json({ message: 'Erreur like service !' });
    }

    Sauce.findOne({ id: itemId })
        .then(sauce => {
            let opinionArr = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            }
            const liked = req.body.like;
            switch (liked) {
                case 1:
                    opinionArr.usersLiked.push(userId)
                    break;

                case 0:
                    if (opinionArr.usersLiked.includes(userId)) {
                        const userToDeleted = opinionArr.usersLiked.indexOf(userId)
                        console.log(userToDeleted);
                        opinionArr.usersLiked.splice(index, 1)
                    }
                    if (opinionArr.usersDisliked.includes(userId)) {
                        const userToDeleted = opinionArr.usersDisliked.indexOf(userId)
                        console.log(userToDeleted);
                        opinionArr.usersDisliked.splice(index, 1)
                    }

                    break;

                case -1:
                    opinionArr.usersDisliked.push(userId)

                    break;

            };
            opinionArr.likes = opinionArr.usersLiked.length;
            opinionArr.dislikes = opinionArr.usersDisliked.length;

            sauce.updateOne({ id: itemId }, opinionArr)
                .then(() => res.status(200).json({ message: 'Votre avis à été enregistré !' }))
        })
}

exports.updateSauce = (req, res, next) => {
    const sauceProduct = req.file ? {
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

