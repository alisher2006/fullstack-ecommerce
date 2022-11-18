import './navbar.scss';
import '../../pages/home.scss';
import logo from '../../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../redux/slices/cartReducer';
import { useCallback, useState } from 'react';
import { fetchProductsByName } from '../../redux/slices/productReducer';
import { logoutUser } from 'redux/slices/authReducer';

import { AppDispatch, RootState } from '../../redux/store';
import emptyCart from '../../images/empty-cart.png';
import { Link } from 'react-router-dom';
function Navbar() {
  var sum = 0;
  var sub = 0;
  const item = useSelector((state: RootState) => state.cart);

  localStorage.setItem('cartItems', JSON.stringify(item.inCart));
  localStorage.setItem('favorites', JSON.stringify(item.inFavorites));

  const dispatch = useDispatch<AppDispatch>();
  var temp = JSON.parse(localStorage['cartItems']);
  var favorites = JSON.parse(localStorage['favorites']);

  function getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user') as string;
      return JSON.parse(userStr) || [];
    } catch (ex) {}
  }

  const currentUser = getCurrentUser();

  const handleRemove = (productId: any) => {
    dispatch(remove(productId));
  };

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(fetchProductsByName(searchValue));
  };

  return (
    <header className='border-bottom'>
      <div className='container '>
        <div className='row'>
          <div className='col-2'>
            <Link to='/'>
              <img src={logo} alt='logo' className='logo' />
            </Link>
          </div>

          <div className='col-6'>
            <div className='product_search'>
              <form>
                <input
                  className='form-control'
                  placeholder='Search Product...'
                  type='text'
                  value={searchValue}
                  onChange={handleChangeSearchValue}
                />
                <button
                  type='submit'
                  className='product_search__btn'
                  onClick={handleClick}
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className='col'>
            {!currentUser.isLoggedIn ? (
              <div className='cart-menu'>
                <i className='bi bi-person'></i>
                <Link className='cart-menu__sub-text' to='/signin'>
                  <div className='primary-small'>Sign In</div>

                  <div className='primary-text'>Account</div>
                </Link>
              </div>
            ) : (
              <div className='cart-menu'>
                <i className='bi bi-person'></i>

                <Link
                  className='cart-menu__sub-text'
                  to='/'
                  onClick={handleLogout}
                >
                  <div className='primary-small'>Logout</div>

                  <div className='primary-text'> {currentUser.username} </div>
                </Link>
              </div>
            )}
            <div className='cart-menu'>
              <Link to='/#'>
                <i className='bi bi-heart'></i>
              </Link>
              <div className='cart-menu__count'>
                <span className='cart-menu__number'>
                  {' '}
                  {Object.keys(favorites).length}{' '}
                </span>
              </div>
            </div>
            <div className='cart-menu'>
              <div className='cart-menu__count'>
                {' '}
                {Object.keys(temp).length}{' '}
              </div>
              <i className='bi bi-cart3'></i>

              <div className='hidden-value-total'>
                {temp.map((cartItem: any) => (
                  <div key={cartItem.name} className='cart-menu__total-price'>
                    {(sum += Number(cartItem.price))}
                    {(sub += cartItem.price * cartItem.cartQuantity).toFixed(2)}
                  </div>
                ))}
              </div>
              <Link to='/#'>
                <div className='cart-menu__sub-text'> Total</div>
                <div className='cart-menu__bold-price'>${sub.toFixed(2)}</div>
              </Link>

              {/* this is modal */}

              <div className='cart-dropdown'>
                <div className='cart-dropdown__wrapper'>
                  <div className='fl-mini-cart-content'>
                    {temp.length > 0 ? (
                      <div className='available-items'>
                        {temp.map((cartItem: any) => (
                          <div
                            key={cartItem.name}
                            className='row border-bottom p-bottom'
                          >
                            <div className='col text-left col-lg-2'>
                              <img
                                className='cart-dropdown__sm-pt-image '
                                src={cartItem.images}
                                alt={cartItem.name}
                              />
                            </div>
                            <div className='col-8 product-title'>
                              {cartItem.name}

                              <div className='row sm-amount-price'>
                                <div className='col-md-2'>
                                  {' '}
                                  {cartItem.cartQuantity}
                                </div>
                                <div className='col-sm-3 '>x</div>
                                <div className='col-sm-4'>
                                  ${cartItem.price}
                                </div>
                              </div>
                            </div>
                            <div className='col text-right'>
                              <i
                                className='bi bi-x-circle'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRemove(cartItem.name)}
                              ></i>
                            </div>
                          </div>
                        ))}

                        <div className='row'>
                          <div className='col'>Total:</div>
                          <div className='col cart-dropdown__total-right'>
                            ${parseFloat(sub.toFixed(2))}
                          </div>
                        </div>

                        <div className='d-grid gap-2'>
                          <Link
                            to='/cart'
                            className='btn btn-outline-secondary'
                            role='button'
                          >
                            View Cart
                          </Link>
                          <Link
                            to='/checkout'
                            className='btn btn-primary'
                            role='button'
                          >
                            Proceed to Checkout
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className='cart-empty'>
                        <div className='empty-icon'>
                          <img src={emptyCart} alt='empty-cart-icon' />
                        </div>
                        <div className='empty-text'>
                          No products in the cart.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* end of the modal */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
