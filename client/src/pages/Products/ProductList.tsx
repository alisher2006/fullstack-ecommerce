import './product.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  productsFetch,
  filterProduct,
} from '../../redux/slices/productReducer';
import { useEffect } from 'react';
import loader from '../../images/loader.svg';
import { add, favorites } from '../../redux/slices/cartReducer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import slideImg1 from '../../images/electronic.jpeg';
import slideImg2 from '../../images/jewellery.jpeg';
import slideImg3 from '../../images/mens-fashion.jpeg';
import slideImg4 from '../../images/left-banner-image.jpg';
import slideImg5 from '../../images/womans-cloth.jpeg';

function ProductList() {
  if (localStorage.getItem('cartItems') === null) {
    console.log(localStorage.getItem('cartItems'));
  }

  if (localStorage.getItem('favorites') === null) {
    console.log(localStorage.getItem('favorites'));
  }

  const { products } = useSelector((state: RootState) => {
    return state;
  });
  const renderProducts =
    products.filteredItems.length === 0
      ? products.products
      : products.filteredItems;

  // const filterProduct1 = (cat: any) => {
  //   const updatelist = products.products.filter((x: any) => {
  //     return x.category === cat;
  //   });
  // };
  // const hanlleFilter = (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  const handleAdd = (product: object) => {
    dispatch(add(product));
  };

  const handleFavorites = (pId: object) => {
    dispatch(favorites(pId));
  };

  // const handleAll = (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   dispatch(productsFetch());
  // };

  if (products.isLoading)
    return <img src={loader} className='loader' alt='logo' />;
  if (products.hasError) return <p>Oop! Error occurs while loading data ...</p>;

  return (
    <div>
      <div className='container-fluid border-bottom-product '>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='left-content'>
              <div className='thumb'>
                <img src={slideImg4} alt='' />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='right-content'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='right-first-image'>
                    <div className='thumb'>
                      <img src={slideImg1} alt='' />
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='right-first-image'>
                    <div className='thumb'>
                      <img src={slideImg2} alt='' />
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='right-first-image'>
                    <div className='thumb'>
                      <img src={slideImg3} alt='' />
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='right-first-image'>
                    <div className='thumb'>
                      <img src={slideImg5} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row border-section'>
          <div className='col-sm-4 mx-auto'>
            <div className='policy_item'>
              <div className='item_icon'>
                <i className='bi bi-truck' style={{ fontSize: '48px' }}></i>
              </div>
              <div className='item_content'>
                <h3 className='text-uppercase'>Free shipping</h3>
                <p className='mb-0'>On All Orders</p>
              </div>
            </div>
          </div>

          <div className='col-sm-4 mx-auto'>
            <div className='policy_item'>
              <div className='item_icon'>
                <i className='bi bi-wallet' style={{ fontSize: '48px' }}></i>
              </div>
              <div className='item_content'>
                <h3 className='text-uppercase'>100% MONEY BACK</h3>
                <p className='mb-0'>30 Days Guaranteed</p>
              </div>
            </div>
          </div>

          <div className='col-sm-4 mx-auto'>
            <div className='policy_item'>
              <div className='item_icon'>
                <i
                  className='bi bi-credit-card-2-front'
                  style={{ fontSize: '48px' }}
                ></i>
              </div>
              <div className='item_content'>
                <h3 className='text-uppercase'>SECURE PAYMENT</h3>
                <p className='mb-0'>No hustle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='product-container'>
        <div className='row'>
          <div className='col-lg-4 col-md-4'>
            <div className='section-title'>
              <h4>OUR LATEST COLLECTION</h4>
            </div>
          </div>

          <div className='col-lg-8 col-md-8 '>
            <nav className='navbar navbar-expand-lg filter__controls'>
              <div className='container-fluid'>
                <button
                  className='navbar-toggler'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarNav'
                  aria-controls='navbarNav'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                  <ul className='navbar-nav '>
                    <li
                      className='active'
                      data-filter='*'
                      onClick={() => dispatch(productsFetch())}
                    >
                      All
                    </li>
                    <li
                      onClick={() => dispatch(filterProduct("men's clothing"))}
                    >
                      Men's Clothing{' '}
                    </li>
                    <li
                      onClick={() =>
                        dispatch(filterProduct("women's clothing"))
                      }
                    >
                      {' '}
                      Women's Clothing
                    </li>
                    <li onClick={() => dispatch(filterProduct('jewelery'))}>
                      {' '}
                      Jewelery{' '}
                    </li>
                    <li onClick={() => dispatch(filterProduct('electronics'))}>
                      Electronic
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className='container'>
          <div className='row mx-auto'>
            {renderProducts.map((item: any) => {
              return (
                <div key={item.name} className='col-md-3'>
                  <div>{item.category}</div>
                  <div>
                    <div className='product-grid'>
                      <div className='product-grid__image'>
                        <div className='thumb'>
                          <div className='hover-content'>
                            <ul>
                              <li
                                className='make-margin'
                                onClick={() => handleAdd(item)}
                              >
                                <span className='bghover'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    fill='currentColor'
                                    className='bi bi-suit-heart'
                                    viewBox='0 0 512 512'
                                  >
                                    <path
                                      className='cls-1'
                                      d='M511.6,147.38a20.48,20.48,0,0,0-20.08-24.5H139.67L122.48,36.94A20.48,20.48,0,0,0,102.4,20.48H20.48a20.48,20.48,0,1,0,0,41H85.61l37.67,188.35,0,.18,12.77,63.86h0l7.67,38.35a20.48,20.48,0,0,0,20.08,16.46H450.56a20.48,20.48,0,0,0,20.08-16.46L491.08,250l0-.21Zm-45.06,16.46-12.29,61.44H160.15l-11.5-57.47-.79-4ZM180.63,327.68l-12.29-61.44H446.06l-12.29,61.44Z'
                                    />
                                    <circle
                                      className='cls-1'
                                      cx='225.28'
                                      cy='450.56'
                                      r='40.96'
                                    />
                                    <circle
                                      className='cls-1'
                                      cx='389.12'
                                      cy='450.56'
                                      r='40.96'
                                    />
                                  </svg>
                                </span>
                              </li>
                              <li
                                className='make-margin'
                                onClick={() => handleFavorites(item)}
                              >
                                <span className='bghover'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    fill='currentColor'
                                    className='bi bi-suit-heart'
                                    viewBox='0 0 512 512'
                                  >
                                    <path
                                      className='cls-1'
                                      d='M256,490.67A21.32,21.32,0,0,1,240.51,484L43.08,275.56A148.45,148.45,0,0,1,0,170.67C0,88.32,67,21.33,149.33,21.33A149,149,0,0,1,256,66.19,149,149,0,0,1,362.67,21.33C445,21.33,512,88.32,512,170.67a148.45,148.45,0,0,1-43.25,105.07L271.49,484A21.32,21.32,0,0,1,256,490.67ZM149.33,64A106.64,106.64,0,0,0,73.57,245.72l.33.34L256,438.31,438.1,246.06A106.65,106.65,0,1,0,273.77,111.77a21.33,21.33,0,0,1-35.54,0A106.51,106.51,0,0,0,149.33,64Z'
                                    />
                                  </svg>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <Link to={`/product/${item._id}`}>
                            <img src={item.images} alt='products' />
                          </Link>
                        </div>
                      </div>

                      <div className='product-content'>
                        <h3 className='product-content__title'>
                          <Link to={`/product/${item._id}`}>
                            {' '}
                            {item.name.substring(0, 10)}
                          </Link>
                        </h3>

                        <div className='product-content__price'>
                          ${item.price}
                        </div>
                        <button
                          className='product-content__btn'
                          onClick={() => handleAdd(item)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                  {/** End of First row */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
