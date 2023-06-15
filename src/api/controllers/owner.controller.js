const Owner = require("../models/owner.model");
const { deleteFile } = require('../../middlewares/delete.file');

const getOwners = async (req, res) => {
    try {
        const owner = await Owner.find();
        if (!owner) {
            return res.status(404).json({message: 'Not found owner'})
        }        
        return res.status(200).json(owner);
    } catch (error) {
        console.log("error GET owners ----", error);
        return res.status(500).json(error);
    }
}

const postOwners = async (req, res) => {
    try {
        const newOwner = new Owner(req.body);
        if (req.file) {
            newOwner.image = req.file.path; // for image uploaded in cloudinary
        }
        const createdOwner = await newOwner.save();
       
        return res.status(200).json(createdOwner);
    } catch (error) {
        console.log("error POST owners ----", error);
        return res.status(500).json(error);
    }
}

const putOwners = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    try {
        const {id} = req.params;
        const putOwner = new Owner(req.body);
        putOwner._id = id; 
        console.log("req.file ------", req.body);       
        if(req.file){
            putOwner.image = req.file.path;
        }
        console.log("putowner ------", putOwner);       
        const updatedOwner = await Owner.findByIdAndUpdate(id, putOwner)
        console.log("updatedowner------", updatedOwner);       
        if(!updatedOwner){
            return res.status(404).json({message: "El id de este owner no existe"});
        }
        if(updatedOwner.image !== putOwner.image){
            deleteFile(updatedOwner.image);
        }
        return res.status(200).json(updatedOwner);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { getOwners, postOwners, putOwners };