const express = require("express")
const { authMiddleware } = require("../auth")
const user = require("./user.routes")
const order = require("./order.routes")
const product = require("./product.routes")

const apiRouter = express.Router();

apiRouter.use('/user',user)
apiRouter.use('/order', order);
apiRouter.use('/product', product);

module.exports = apiRouter;