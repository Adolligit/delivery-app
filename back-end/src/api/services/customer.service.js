const HttpStatus = require('../../utils/HttpStatus');
const { products, sales, users } = require('../../database/models');

const customerPath = async () => {
  const getProducts = await products.findAll();

  if (!getProducts) {
    throw new Error('Products not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return getProducts;
};

const createOrder = async (saleInfo) => {
  // TypeError: Cannot read properties of undefined (reading 'status')
  const order = await sales.create({
    userId: saleInfo.userId,
    sellerId: saleInfo.sellerId,
    totalPrice: saleInfo.totalPrice,
    deliveryAddress: saleInfo.deliveryAddress,
    deliveryNumber: saleInfo.deliveryNumber,
    // status: 'Pendente',
  });

  console.log(order);
};

const getOrders = async (userId) => {
  const orders = await sales.findAll({ where: { userId } });
  return orders;
};

const getOrderById = async (id) => {
  const order = await sales.findOne({
    where: { id },
    include: [
      { model: products, as: 'products', through: { attributes: ['quantity'] } },
      { model: users, as: 'seller', attributes: ['name'] },
    ],
  });
  if (!order) throw new Error('Order not found', { cause: { status: HttpStatus.NOT_FOUND } });
  return order;
};

module.exports = {
  customerPath,
  createOrder,
  getOrders,
  getOrderById,
};

/**
pedido: {
  venda: *detalhes da venda*,
  produtos: [{}, {}, ...]
}

  // const produtos = saleInfo.products;
  const venda = saleInfo.sale;

  await Promise.all(produtos.map(async (product) => {
      await salesProducts.create({ 
        saleId: order.id,
        productId: product.id,
        quantity: product.quantity,
      });
    }));

  // return order;
 */