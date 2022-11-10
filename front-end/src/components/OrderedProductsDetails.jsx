import PropTypes from 'prop-types';

const dataTestIds = {
  itemNumber: 'seller_order_details__element-order-table-item-number-',
  tableName: 'seller_order_details__element-order-table-name-',
  tableQuantity: 'seller_order_details__element-order-table-quantity-',
  unitPrice: 'seller_order_details__element-order-table-unit-price-',
  subTotal: 'seller_order_details__element-order-table-sub-total-',
};

function OrderedProductsDetails({ product }) {
  const { id, name, salesProducts: { quantity }, price } = product;

  return (
    <>
      <td data-testid={ `${dataTestIds.itemNumber}${id}` }>{ id }</td>
      <td data-testid={ `${dataTestIds.tableName}${id}` }>{ name }</td>
      <td data-testid={ `${dataTestIds.tableQuantity}${id}` }>{ quantity }</td>
      <td data-testid={ `${dataTestIds.unitPrice}${id}` }>
        { Number(price).toFixed(2).replace('.', ',') }
      </td>
      <td data-testid={ `${dataTestIds.subTotal}${id}` }>
        { Number(quantity * price).toFixed(2).replace('.', ',') }
      </td>
    </>
  );
}

OrderedProductsDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    salesProducts: PropTypes.shape({
      quantity: PropTypes.number,
    }),
    price: PropTypes.string,
  }).isRequired,
};

export default OrderedProductsDetails;
