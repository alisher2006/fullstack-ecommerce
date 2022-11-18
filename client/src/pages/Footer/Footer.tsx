import React from 'react';
import './footer.scss';
function Footer() {
  return (
    <footer
      id='sticky-footer'
      className='flex-shrink-0 py-4 bg-dark text-white-50 footer'
    >
      <div className='container text-center'>
        <small>Copyright &copy; Free e-commerce</small>
      </div>
    </footer>
  );
}

export default Footer;
