import { useContext, useEffect, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const {
    products,
    setProducts,
    setCheckoutProductStatus,
  } = useContext(DeliveryContext);

  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = useCallback(async () => { // Recupera produtos e adiciona uma quantidade a cada um deles.
    const productsList = await requestProducts('/customer/products');
    const productListWithQuantity = productsList.map((prod) => ({
      ...prod,
      price: Number(prod.price),
      quantity: 0,
    }));
    setCartItems(productListWithQuantity);
    setProducts(productsList);
  }, [setProducts]);

  useEffect(() => { // Chama a função que recupera os produtos do back-end
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => { // Toda vez que o carrinho do estado local atualiza adiciona ao carrinho no localStorage todos os produtos com quatidade maior que 0
    const cartItemsToStorage = cartItems.filter((prod) => prod.quantity !== 0);
    const cartItemsToSTorageWithPrice = cartItemsToStorage.map((prod) => {
      prod.subTotal = prod.price * prod.quantity;
      return prod;
    });

    localStorage.setItem('carrinho', JSON.stringify({
      cartItems: cartItemsToSTorageWithPrice,
      totalPrice: cartItemsToSTorageWithPrice.map((prod) => prod.subTotal)
        .reduce((prev, crr) => prev + crr, 0),
    }));

    const isCartFilled = JSON.parse(localStorage.getItem('carrinho'));

    if (isCartFilled.totalPrice > 0) {
      setCheckoutProductStatus({
        checkoutDisabled: false,
        amountOfItemsOnCart: isCartFilled.cartItems.length,
        totalPrice: isCartFilled.totalPrice,
      });
    } else {
      setCheckoutProductStatus({
        checkoutDisabled: true,
        amountOfItemsOnCart: isCartFilled.cartItems.length,
        totalPrice: isCartFilled.totalPrice,
      });
    }
  }, [cartItems, setCheckoutProductStatus]);

  const updateCart = (product, buttonAction) => { // Atualiza o carrinho do estado local
    const newCart = cartItems.map((prod) => { // Retorna um array com quantidades atualizadas
      if (prod.id === product.id) {
        if (buttonAction === 'add_button') { // Verifica qual botão foi selecionado, add_button ou rm_button
          prod.quantity += 1;
          return prod;
        }

        prod.quantity = prod.quantity === 0 ? 0 : prod.quantity - 1;
        return prod;
      }

      return prod;
    });

    setCartItems(newCart); // Atualiza o carrinho do estado local
  };

  const handleInputsChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newCart = cartItems.map((prod) => { // Retorna um array com quantidades atualizadas
      if (prod.name === name) {
        prod.quantity = Number(value);
        return prod;
      }

      return prod;
    });

    setCartItems(newCart); // Atualiza o carrinho do estado local
  };

  const handleButtonChange = (event, product) => {
    const { name: buttonAction } = event.target;
    updateCart(product, buttonAction); // Chama a função que atualiza o carrinho dependendo do botão clicado
  };

  return (
    <section className="product-cards">
      {products.length > 0 && products.map((prod) => {
        const { id, name, price, urlImage } = prod;

        return (
          <div
            key={ uuidv4() }
          >
            <img
              src={ urlImage }
              alt={ name }
              data-testid={ `customer_products__img-card-bg-image-${id}` }
            />
            <span
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              {name}
            </span>
            <span
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              {price.toString().replace('.', ',')}
            </span>
            <div className="card-controls">
              <button
                name="rm_button"
                type="button"
                data-testid={ `customer_products__button-card-rm-item-${id}` }
                onClick={ (e) => handleButtonChange(e, prod) }
              >
                -
              </button>
              <input
                name={ name }
                type="number"
                min="0"
                data-testid={ `customer_products__input-card-quantity-${id}` }
                onChange={ handleInputsChange }
                value={ cartItems[(id - 1)].quantity } // Puxa os valores dos inputs do carrinho do estado local, todos iniciam com 0, a posição de cada produto é seu ID menos um.
              />
              <button
                name="add_button"
                type="button"
                data-testid={ `customer_products__button-card-add-item-${id}` }
                onClick={ (e) => handleButtonChange(e, prod) }
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Products;
