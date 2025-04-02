const express = require("express")
const user = require("./user.routes")

const apiRouter = express.Router();

apiRouter.use('/user',user)


module.exports = apiRouter;