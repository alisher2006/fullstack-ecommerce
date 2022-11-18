import Navbar from 'components/Navbar/Navbar';
import Footer from 'pages/Footer/Footer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'redux/store';
import './confirm.css';
function Confirm() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const user = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [dispatch]);

  var sum = 0;
  function convert(input_date: any) {
    let order_date = new Date(input_date);
    let dateMDY =
      order_date.getDate() +
      '-' +
      (order_date.getMonth() + 1) +
      '-' +
      order_date.getFullYear();

    return dateMDY;
  }

  useEffect(() => {
    const fetchData = async () => {
      //find({userId: JSON.stringify(req.params.userId)})
      const response = await fetch('http://localhost:4000/api/v1/order/');
      const json = await response.json();
      setData(json);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <p className='container order-received'>
          Thank you. Your order has been received.
        </p>
        {data.map((r: any) => (
          <>
            <div className='container spacing'>
              <ul key={r._id} className='order-received__details'>
                <li className=''>
                  Order number:{' '}
                  <strong>
                    <li key={r._id}>{r._id.substring(10, 24)}</li>
                  </strong>
                </li>

                <li>
                  Date: <strong> {convert(r.updatedAt)}</strong>
                </li>

                <li className='method'>
                  Payment method: <strong>Cash on delivery</strong>
                </li>
              </ul>
            </div>
            <div className='container'>
              <p>Pay with cash upon delivery.</p>
              <div className='row bold'>
                <div className='col border'>Product</div>
                <div className='col border'> </div>
                <div className='col border'> </div>
              </div>
              {r.products.map((c: any) => (
                <>
                  <div className='hidden-value-total'>
                    {(sum += c.price * c.cartQuantity).toFixed(2)}
                  </div>
                  <div className='row'>
                    <div className='col border'>
                      {c.productname} x{' '}
                      <span className='bold'>{c.cartQuantity}</span>
                    </div>
                    <div className='col border'>
                      {c.cartQuantity} x {c.price.toFixed(2)}
                    </div>
                    <div className='col border'>
                      {' '}
                      {(c.cartQuantity * c.price).toFixed(2)}
                    </div>
                  </div>
                </>
              ))}

              <div className='row bold'>
                <div className='col border'></div>
                <div className='col border'></div>
                <div className='col border'>{sum.toFixed(2)}</div>
              </div>
            </div>
          </>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Confirm;
