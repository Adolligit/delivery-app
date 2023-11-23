const express = require('express');
const CustomerController = require('../controllers/customer.controller');
const { validateToken } = require('../middlewares/auth.middleware');

const customer = express();

customer.use(validateToken);
customer.get('/products', CustomerController.customerPath);
customer.post('/checkout', CustomerController.createOrder);
customer.get('/orders', CustomerController.getOrders);
customer.get('/orders/:id', CustomerController.getOrderById);

module.exports = customer;
