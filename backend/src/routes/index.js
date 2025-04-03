const express = require("express")
const user = require("./user.routes")
const product = require("./order.routes")

const apiRouter = express.Router();

apiRouter.use('/user',user)
apiRouter.use('/order', product);

module.exports = apiRouter;