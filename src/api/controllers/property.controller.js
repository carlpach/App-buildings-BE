const { deleteFile } = require('../../middlewares/delete.file');
const Property = require("../models/property.model");

const getProperties = async (req, res) => {
    try {
        const property = await Property.find();
        if (!property) {
            return res.status(404).json({message: 'Not found property'})
        }        
        return res.status(200).json(property);
    } catch (error) {
        console.log("error GET properties ----", error);
        return res.status(500).json(error);
    }
}

const postProperties = async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        if (req.file) {
            newProperty.image = req.file.path; // for image uploaded in cloudinary
        }
        const createdProperty = await newProperty.save();
       
        return res.status(200).json(createdProperty);
    } catch (error) {
        console.log("error POST Properties ----", error);
        return res.status(500).json(error);
    }
}

const putProperties = async(req,res) => {
    try {
        const {id} = req.params;
        const putLibro = new Property(req.body);
        putLibro._id = id; 
        console.log("req.file ------", req.file);       
        console.log("putLibro ------", putLibro);       
        if(req.file){
            putLibro.image = req.file.path;
        }
        const updatedLibro = await Property.findByIdAndUpdate(id, putLibro)
        console.log("updatedLibro ------", updatedLibro);       
        if(!updatedLibro){
            return res.status(404).json({message: "El id de este Property no existe"});
        }
        if(updatedLibro.image !== putLibro.image){
            deleteFile(updatedLibro.image);
        }
        return res.status(200).json(updatedLibro);
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = { getProperties, postProperties, putProperties };