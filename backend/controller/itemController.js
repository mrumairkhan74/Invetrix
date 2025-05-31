const { model } = require('mongoose');
const itemsModel = require('../model/itemModel');


// get items
const getItem = async (req, res) => {
    try {
        const items = await itemsModel.find().populate('supplier', 'name');
        if (!items || items.length === 0) {
            return res.status(404).json('Not Available')
        }
        return res.status(200).json(items);
    }
    catch (error) {
        return res.status(500).json(error)
    }
}


// get item by Id
const getItemId = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await itemsModel.findById(id);
        if (!items) {
            return res.status(404).json(`invalid ${id}`)
        }
        return res.status(200).json(items);
    }
    catch (error) {
        return res.status(500).json(error)
    }
}


// create item
const createItem = async (req, res) => {
    try {
        const { name, category, quantity, unit, expiry } = req.body;
        const item = await itemsModel.create({
            name,
            category,
            quantity,
            unit,
            expiry,
            imageUrl: req.file.originalname,
            image:req.file.Buffer
        })
        return res.status(201).json('Created Successfully')
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}




// update items
const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const items = await itemsModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json({ message: 'updated Successfully', items })
    }
    catch (error) {
        return res.status(500).json(error)
    }
}
// delete item 
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const items = await itemsModel.findByIdAndDelete(id)
        res.status(201).json({ message: 'Deleted Successfully' })
    }
    catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createItem,
    getItem,
    getItemId,
    updateItem,
    deleteItem
}