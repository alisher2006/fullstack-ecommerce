import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import Navbar from 'components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { add } from 'redux/slices/cartReducer';
import { getProduct } from '../../redux/slices/productReducer';
import './singleproduct.scss';
import { plus, minus } from '../../redux/slices/cartReducer';
import { ProductsTS, ProductTS } from 'utils/types';
import axios from 'axios';

function Product() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  var elements = [] as any;

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const { product } = useSelector((state: RootState) => state.products);

  const handleMinus = (productId: any) => {
    dispatch(minus(productId));
  };

  const handlePlus = (productId: any) => {
    dispatch(plus(productId));
  };

  const handleAdd = (product: object) => {
    dispatch(add(product));
  };
  elements.push(product);
  return (
    <div>
      <Navbar />
      <div>
        <div className='container '>
          <div className='row'>
            <div className='col-xl-5 col-lg-5 col-sm-12 col-md-12 product-detail-summary'>
              <img src={elements[0].images} alt='' className='p-images' />
            </div>

            <div className='col-xl-7 col-lg-7 col-sm-12 col-md-12 product-detail-summary'>
              <div className='summary entry-summary'>
                <h1 className='product_title entry-title'> </h1>
                <p className='price'>
                  <span className='currencySymbol'>$</span>
                  {elements[0].price}
                </p>

                <div className='quantity'>
                  <div
                    className='qty-number qty-number-plus'
                    onClick={() => handlePlus(product)}
                  >
                    <span className='increase-qty plus'>
                      <i className='bi bi-plus-lg'></i>
                    </span>
                  </div>
                  <input
                    type='number'
                    className='input-text qty text'
                    name='quantity'
                    value='1'
                    defaultValue='Initial value'
                  />
                  <div className='qty-number qty-number-minus'>
                    <span
                      className='increase-qty minus'
                      onClick={() => handleMinus(product)}
                    >
                      <i className='bi bi-dash-lg'></i>
                    </span>
                  </div>

                  <button
                    type='submit'
                    name='add-to-cart'
                    className='single_add_to_cart_button'
                    onClick={() => handleAdd(product)}
                  >
                    Add to cart{' '}
                  </button>
                </div>

                <div className='availability'>
                  <strong>Availability: </strong>
                  <span className='stock'> In Stock</span>
                </div>

                <div className='p-name'>
                  <strong>Product: </strong>
                  <span className='stock'>{elements[0].name}</span>
                </div>

                <div className='accordion_holder toggle accordion'>
                  <h6 className='title-holder'>
                    <strong>Description: </strong>
                  </h6>
                  <div className='description-content'>
                    <p>{elements[0].description}</p>
                  </div>

                  <div className='accordion-content'></div>
                </div>
                <div className='delivery-return '>
                  <strong>Free Delivery and Returns </strong>

                  <div className='section-wrap'>
                    <section className='section'>
                      <div className='container column-gap-default'>
                        <p>
                          Your order of $500.00 or more gets free standard
                          delivery.
                        </p>
                        <ul>
                          <li>Standard delivered 4-5 Business Days</li>
                          <li>Express delivered 2-4 Business Days</li>
                        </ul>
                        <p>
                          Orders are processed and delivered Monday – Friday
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
