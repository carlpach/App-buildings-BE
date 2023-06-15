const express = require('express');

const { getOwners, postOwners, putOwners } = require("../controllers/owner.controller");
const upload = require("../../middlewares/upload.file");

const ownersRouter = express.Router();

ownersRouter.get('/', getOwners);
ownersRouter.post('/', postOwners);
ownersRouter.put('/:id', upload.single("image"), putOwners);

module.exports = ownersRouter;