import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import logo from '../../images/logo.png';
import { logoutUser } from 'redux/slices/authReducer';
import Footer from 'pages/Footer/Footer';
import NewProduct from 'pages/New/NewProduct';

import { retrieveOrder, deleteOrders } from '../../redux/slices/adminReducer';
const OrderList = () => {
  var sum = 0;
  const { listorders } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveOrder());
  }, [dispatch]);

  //console.log(listorders);
  const handleRemove = (orderId: any) => {
    dispatch(deleteOrders(orderId));
  };

  // function getCurrentUser() {
  //   try {
  //     const userStr = localStorage.getItem('user') as string;
  //     return JSON.parse(userStr) || [];
  //   } catch (ex) {}
  // }
  // const currentUser = getCurrentUser();
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  // useEffect(() => {
  //   if (currentUser.username !== 'admin') {
  //     navigate('/');
  //   }
  // }, [navigate, currentUser]);

  return (
    <>
      <div className='container'>
        {' '}
        <div className='row'>
          <div className='col'>
            <h3>ORDER DETAILS</h3>
            <div className='list-crud-operation'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Customer name</th>
                    <th scope='col'>purchase products</th>
                    <th scope='col'>Total</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listorders.map((item: any) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.fullname}</td>

                        <td>
                          {item.products.map((r: any) => {
                            return (
                              <>
                                <div>
                                  {' '}
                                  {r.productname} x {r.cartQuantity}
                                </div>
                                <div className='hidden-value-total'>
                                  {' '}
                                  {(sum += r.price * r.cartQuantity).toFixed(2)}
                                </div>
                              </>
                            );
                          })}
                        </td>
                        <td>$ {sum.toFixed(2)}</td>

                        <td>
                          <span className='icons-layout'>
                            <i className='bi bi-pencil-square'></i>
                          </span>
                          <span>
                            <i
                              className='bi bi-trash3'
                              onClick={() => handleRemove(item._id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderList;
