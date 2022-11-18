import Navbar from 'components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import './checkout.scss';
import { useEffect, useState } from 'react';
import { confirmOrder } from 'redux/slices/orderReducer';
import { resetCart } from 'redux/slices/cartReducer';

function Checkout() {
  var sum = 0;
  const [fullname, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const item = useSelector((state: RootState) => state.cart);

  localStorage.setItem('cartItems', JSON.stringify(item.inCart));
  var temp = JSON.parse(localStorage['cartItems']);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const productsList = temp.map((cartItem: any) => {
    return {
      productId: cartItem._id,
      productname: cartItem.name,
      cartQuantity: cartItem.cartQuantity,
      price: cartItem.price,
    };
  });

  // console.log(productsList);
  const user = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : null;

  const customer = {
    fullname,
    address,
    city,
    postalcode,
    country,
  };

  const orderData = {
    personData: customer,
    products: productsList,
  };

  //console.log(orderData);
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [dispatch]);

  const checkoutHandler = (e: any) => {
    e.preventDefault();
    dispatch(confirmOrder(orderData));
    navigate('/order-received');
    dispatch(resetCart());
  };

  return (
    <div>
      <Navbar />
      <div className='row content-wrapper'>
        <div className='col-8'>
          <form className='form'>
            <div>
              <h5>SHIPPING ADDRESS</h5>
            </div>
            <div>
              <label>Full Name</label>
              <input
                type='text'
                id='fullName'
                className='form-control form-control-lg'
                placeholder='Enter full name'
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type='text'
                id='address'
                className='form-control form-control-lg'
                placeholder='Enter address'
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>City</label>
              <input
                className='form-control form-control-lg'
                type='text'
                id='city'
                placeholder='Enter your city'
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Postal Code</label>
              <input
                type='text'
                id='postalCode'
                className='form-control form-control-lg'
                placeholder='Enter your Postal code'
                onChange={(e) => setPostalCode(e.target.value)}
              />{' '}
            </div>
            <div>
              <label>Country</label>
              <input
                type='text'
                id='country'
                className='form-control form-control-lg'
                placeholder='Enter your Country'
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className='col-3 cart-details order-review-wrapper rounded-3'>
          <div className='hidden-value-total'>
            {temp.map((cartItem: any) => (
              <div key={cartItem.name} className='cart-menu__total-price'>
                {(sum += cartItem.price * cartItem.cartQuantity).toFixed(2)}
              </div>
            ))}
          </div>
          <div className='heading'>YOUR ORDER</div>
          <div className='order-details'>
            <div className='row cart-details '>
              <div className='col'>Products</div>
              <div className='col text-end'> subtotal</div>
            </div>
            {temp.map((cartItem: any) => (
              <div
                key={cartItem.name}
                className='row cart-detail border-bottom'
              >
                <div className='col'>
                  {cartItem.name} x {cartItem.cartQuantity}
                </div>
                <div className='col text-end'> ${cartItem.price}</div>
              </div>
            ))}

            <div className='row shipment-div'>
              <div className='col'>Shipment</div>
              <div className='col  text-end'>Free </div>
            </div>

            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                onChange={(e) => {}}
              />
              <label>Direct bank transfer</label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                checked
                onChange={(e) => {}}
              />{' '}
              <label>Cash on delivery</label>
            </div>
            <div className='row cart-details shipment-div '>
              <div className='col'>Total</div>

              <div className='col text-end'> ${parseFloat(sum.toFixed(2))}</div>
            </div>
            <div className='row shipment-div '>
              <button className='btn btn-primary' onClick={checkoutHandler}>
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
