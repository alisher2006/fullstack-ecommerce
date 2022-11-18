import Navbar from 'components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { registerUser } from 'redux/slices/authReducer';

function Register() {
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { isError, isSuccess } = useSelector((state: RootState) => state.auth);
  const newUser = {
    username,
    password,
    email,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(registerUser(newUser));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [navigate, isSuccess]);

  return (
    <div>
      {' '}
      <Navbar />
      <div className='row justify-content-center top-space mt-3'>
        <div className='col-md-7 col-lg-5 border padding-space '>
          <h4>New here? Signing up is easy. It only takes a few steps</h4>
          {isError && (
            <div className='error-block'>
              <i className='bi bi-exclamation-circle'></i> Looks like either
              your email address or password already registered!
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className='form-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Username'
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control form-control-lg'
                placeholder='Email'
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control form-control-lg'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='d-grid gap-2'>
              <button className='btn btn-primary'>Register Me</button>
            </div>

            <div className='text-center mt-4 font-weight-light'>
              {' '}
              Already have an account?{' '}
              <Link className='create' to='/signin'>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
