import axios from 'axios';
import Navbar from 'components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginUser } from 'redux/slices/authReducer';
import { AppDispatch, RootState } from '../../redux/store';
import './sign.scss';

function SignIn() {
  const [uname, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { isError, isAuthenticated, username } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = { uname, password };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    dispatch(LoginUser(user));
  };

  //const redirect = location.search ? location.search.split('=')[1] : '/account';

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
    if (username === 'admin') {
      navigate('/dashboard');
    }
  }, [navigate, username, isAuthenticated]);
  return (
    <div>
      <Navbar />
      <div className='row justify-content-center top-space mt-3'>
        <div className='col-md-7 col-lg-5 border padding-space '>
          <h4>Hello! let's get started</h4>

          {isError && (
            <div className='error-block'>
              <i className='bi bi-exclamation-circle'></i> Looks like either
              your email address or password were incorrect
            </div>
          )}
          <form className='pt-3' onSubmit={submitHandler}>
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
                type='password'
                className='form-control form-control-lg'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='d-grid gap-2'>
              <button type='submit' className='btn btn-primary'>
                Sign In
              </button>
            </div>

            <div className='text-center mt-4 font-weight-light'>
              {' '}
              Don't have an account?{' '}
              <Link className='create' to='/register'>
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
