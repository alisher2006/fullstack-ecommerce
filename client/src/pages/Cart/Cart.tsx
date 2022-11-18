import Navbar from 'components/Navbar/Navbar';
import './cart.scss';

import { useSelector, useDispatch } from 'react-redux';
import { remove, plus, minus } from '../../redux/slices/cartReducer';
import { AppDispatch, RootState } from '../../redux/store';
import emptycart from '../../images/empty-cart.png';
import { Link } from 'react-router-dom';

function Cart() {
  const item = useSelector((state: RootState) => state.cart);
  localStorage.setItem('cartItems', JSON.stringify(item.inCart));
  var sub = 0;
  var temp = JSON.parse(localStorage['cartItems']);

  const dispatch = useDispatch<AppDispatch>();

  const handleMinus = (productId: any) => {
    dispatch(minus(productId));
  };

  const handlePlus = (productId: any) => {
    dispatch(plus(productId));
  };

  const handleRemove = (productId: any) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      <Navbar />
      {temp.length > 0 ? (
        <div className='check'>
          <div className='row content-wrapper'>
            <div className='col-8'>
              <div>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'></th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temp.map((cartItem: any) => (
                      <tr key={cartItem._id}>
                        <th scope='row'>
                          <img
                            className='cart-dropdown__sm-pt-image '
                            src={cartItem.images}
                            alt={cartItem.name}
                          />
                        </th>
                        <td>
                          <div className='product-card-details'>
                            <Link to={`/product/${cartItem._id}`}>
                              {' '}
                              {cartItem.name}{' '}
                            </Link>
                          </div>
                        </td>
                        <td>
                          <div className='quantity '>
                            <div
                              className='qty-number qty-number-plus '
                              onClick={() => handlePlus(cartItem)}
                            >
                              <span className='increase-qty plus'>
                                <i className='bi bi-plus-lg'></i>
                              </span>
                            </div>
                            <input
                              type='number'
                              className='input-text qty text'
                              name='quantity'
                              value={cartItem.cartQuantity}
                              disabled
                            />
                            <div
                              className='qty-number qty-number-minus'
                              onClick={() => handleMinus(cartItem)}
                            >
                              <span className='increase-qty minus'>
                                <i className='bi bi-dash-lg'></i>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className='product-card-details'>
                            ${cartItem.price}
                          </div>
                        </td>
                        <td>
                          <div className='product-card-details'>
                            {(cartItem.price * cartItem.cartQuantity).toFixed(
                              2
                            )}
                          </div>
                        </td>
                        <td
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemove(cartItem.name)}
                        >
                          <div className='cancel'>
                            <div className='x-icon'>x</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='col-3 cart-details'>
              <div className='hidden-value-total'>
                {temp.map((cartItem: any) => (
                  <div className='cart-menu__total-price'>
                    ffdfs
                    {(sub += cartItem.price * cartItem.cartQuantity).toFixed(2)}
                  </div>
                ))}
              </div>
              <div className='heading border-bottom'>CART TOTALS</div>
              <div className='row'>
                <div className='row cart-details'>
                  <div className='col'>Subtotal</div>
                  <div className='col text-end'>
                    ${parseFloat(sub.toFixed(1))}
                  </div>
                </div>
                <div className='row cart-details'>
                  <div className='col'>Shipping</div>
                  <div className='col text-end'>Free</div>
                </div>
                <div className='row cart-details'>
                  <div className='col'>Total</div>
                  <div className='col text-end'>
                    {' '}
                    ${parseFloat(sub.toFixed(2))}
                  </div>
                </div>
                <div className='row'>
                  <Link
                    to='/checkout'
                    className='btn btn-primary'
                    role='button'
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='cart-empty'>
          <div className='empty-icon'>
            <img src={emptycart} alt='empty-cart-icon' />
          </div>
          <div className='empty-text'>No products in the cart.</div>
          <div className='col text-center'>
            <Link to='/' className='btn btn-dark' role='button'>
              Return to shop
            </Link>
          </div>
        </div>
      )}
      {/* hello this iend  */}
    </div>
  );
}

export default Cart;
