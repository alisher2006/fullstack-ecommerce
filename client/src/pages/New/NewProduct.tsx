import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProducts } from 'redux/slices/adminReducer';
import { AppDispatch, RootState } from 'redux/store';

function NewProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { isError } = useSelector((state: RootState) => state.admin);

  const [name, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  const [stock, setStock] = useState('');
  const newUser = {
    name,
    price,
    category,
    images,
    stock,
    description,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.target.reset();
    dispatch(createProducts(newUser));
  };

  return (
    <div className='p-layout'>
      <div className='row justify-content-center top-space mt-3 add-form'>
        <div className='col-md-7 border padding-space add-form'>
          {isError && (
            <div className='error-block'>
              <i className='bi bi-exclamation-circle'></i> Looks like product
              already registered!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Product Name'
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Price'
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Category'
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Images'
                onChange={(e) => setImages(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Stock'
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <textarea
                className='form-control'
                placeholder='Description'
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='d-grid gap-2'>
              <button className='btn btn-primary'>Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
