const express = require('express');
const Sauce = require('../models/Sauces');

exports.getSauces = (req, res, next) => {
    const sauceParse = JSON.parse(req.body.sauce);
    delete productParse._id;
    const sauce = new Sauce({
        ...sauceParse
    })
}