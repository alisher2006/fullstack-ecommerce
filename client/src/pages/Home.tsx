import Navbar from 'components/Navbar/Navbar';
import Footer from './Footer/Footer';
import ProductList from './Products/ProductList';

const Home = () => {
  return (
    <div className='app'>
      {/** Navbar */}
      <Navbar />
      {/** Inner container with listed product from server */}
      <ProductList />
      {/** Footer */}
      <Footer />
    </div>
  );
};

export default Home;
