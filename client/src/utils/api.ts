import axios from 'axios';

export const URL_API = 'http://localhost:4000/api/v1';

export const getProducts = () => {
  return axios.get(`http://localhost:4000/api/v1/product`);
};

export const getUrl = () => {
  return axios.get('http://localhost:4000/api/v1');
};
