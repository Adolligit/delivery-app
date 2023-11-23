const express = require('express');
const SaleController = require('../controllers/sale.controller');
const { validateToken } = require('../middlewares/auth.middleware');

const seller = express();

seller.use(validateToken);
seller.get('/orders', SaleController.getSalesBySellerId);
seller.get('/orders/:id', SaleController.getSaleById);
seller.patch('/orders/:id', SaleController.updateStatus);

module.exports = seller;