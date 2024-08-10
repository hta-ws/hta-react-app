import React from 'react';

const StockHeader = () => {
  return (
    <div className='d-flex align-items-center ms-4'>
      <div className='avatar-xs rounded p-1 me-2'>
        <img
          src='https://fintables.com/_next/image?url=https%3A%2F%2Ffintables-prod.storage.googleapis.com%2Fmedia%2Fuploads%2Fcompany-logos%2Fagrot_icon.png&w=96&q=75'
          alt=''
          className='img-fluid d-block'
        />
      </div>
      <div>
        <h5 className='fs-14 my-1'>
          <a
            className='text-white'
            href='/velzon/react/master/apps-ecommerce-product-details'
          >
            Branded T-Shirts
          </a>
        </h5>
        <span className='text-muted'>24 Apr 2021</span>
      </div>
    </div>
  );
};

export default StockHeader;
