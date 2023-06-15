const express = require('express');

const { getProperties, postProperties, putProperties } = require("../controllers/property.controller");
const upload = require("../../middlewares/upload.file");

const propertiesRouter = express.Router();

propertiesRouter.get('/', getProperties);
propertiesRouter.post('/', upload.single("image"), postProperties);
propertiesRouter.put('/:id', upload.single("image"), putProperties);

module.exports = propertiesRouter;