import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import logo from '../../images/logo.png';
import { logoutUser } from 'redux/slices/authReducer';
import './dashboard.css';
import Footer from 'pages/Footer/Footer';
import NewProduct from 'pages/New/NewProduct';

import {
  retrieveProducts,
  deleteProducts,
} from '../../redux/slices/adminReducer';
import OrderList from 'pages/Order/OrderList';
const Dashboard = () => {
  const { isError, listproducts } = useSelector(
    (state: RootState) => state.admin
  );

  const [editname, setEditProductName] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveProducts());
  }, [dispatch]);

  const handleRemove = (productId: any) => {
    dispatch(deleteProducts(productId));
  };

  function getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user') as string;
      return JSON.parse(userStr) || [];
    } catch (ex) {}
  }
  const currentUser = getCurrentUser();
  const handleLogout = () => {
    //  dispatch(logoutUser());
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (currentUser.username !== 'admin') {
      navigate('/');
    }
  }, [navigate, currentUser]);

  return (
    <>
      <div className='container'>
        {' '}
        <nav className='navbar'>
          <div className='justify-content-between'>
            <img src={logo} alt='logo' className='logo' />{' '}
          </div>

          <div className='cart-menu'>
            <i className='bi bi-person'></i>

            <Link className='cart-menu__sub-text' to='/' onClick={handleLogout}>
              <div className='primary-small'>Logout</div>

              <div className='primary-text'> {currentUser.username} </div>
            </Link>
          </div>
        </nav>
        <div className='row'>
          <div className='col-3'>
            <div className='sidebar'>
              <ul>
                <li className='active'>
                  <a href='home.html'>
                    <span className='hidden-xs hidden-sm'>Add Product</span>
                  </a>
                </li>
                <li className='active'>
                  <span className='hidden-xs hidden-sm'>Products</span>
                </li>
                <li className='active'>
                  <span className='hidden-xs hidden-sm'>Users</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='col'>
            <div className='right-panel'>
              <NewProduct />
            </div>
            <div className='list-crud-operation'>
              <h3>PRODUCT DETAILS</h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Product Images</th>
                    <th scope='col'>Product name</th>

                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listproducts.map((item: any) => {
                    return (
                      <>
                        <tr key={item._id}>
                          <th scope='row'>
                            <img
                              src={item.images}
                              alt='logo'
                              className='logo'
                            />
                          </th>
                          <td>{item.name} </td>
                          <td>
                            <span className='icons-layout'>
                              <i
                                className='bi bi-pencil-square'
                                data-toggle='modal'
                                data-target='#myModal'
                              ></i>
                            </span>
                            <span>
                              <i
                                className='bi bi-trash3'
                                onClick={() => handleRemove(item._id)}
                              ></i>
                            </span>
                          </td>
                        </tr>

                        <div className='modal fade' id='myModal'>
                          <div className='modal-dialog'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h4 className='modal-title'>Edit Product</h4>
                              </div>
                              <div className='modal-body'>
                                <div className='form-group'>
                                  <div className='edit-product-layout'>
                                    <input
                                      type='text'
                                      className='form-control form-control-lg'
                                      placeholder='Product'
                                      value={item.name}
                                    />
                                  </div>
                                  <div className='come'>{item._id}</div>
                                  <div className='edit-product-layout'>
                                    <input
                                      type='text'
                                      className='form-control form-control-lg'
                                      placeholder='Category'
                                    />
                                  </div>
                                  <div className='edit-product-layout'>
                                    <input
                                      type='text'
                                      className='form-control form-control-lg'
                                      placeholder='Images'
                                    />
                                  </div>
                                  <div className='edit-product-layout'>
                                    <input
                                      type='text'
                                      className='form-control form-control-lg'
                                      placeholder='Stock'
                                    />
                                  </div>
                                  <div className='edit-product-layout'>
                                    <textarea
                                      className='form-control'
                                      placeholder='Description'
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className='modal-footer'>
                                <button
                                  type='button'
                                  className='btn btn-primary'
                                  data-dismiss='modal'
                                >
                                  Update Product
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-primary'
                                  data-dismiss='modal'
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <OrderList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
