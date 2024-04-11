import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

// Özelleştirilmiş bir toast bildirimi göstermek için bir yardımcı fonksiyon
const displayToast = (message, variant) => {
  const toastProps = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (variant) {
    case 'success':
      toast.success(message, toastProps);
      break;
    case 'warning':
      toast.warn(message, toastProps);
      break;
    case 'error':
      toast.error(message, toastProps);
      break;
    case 'info':
      toast.info(message, toastProps);
      break;
    default:
      toast(message, toastProps);
  }
};

// AppMessageView bileşenini yeniden yazıyoruz
const AppMessageView = ({ message, variant }) => {
  // useEffect ile mesaj değiştiğinde bir toast gösteriyoruz
  React.useEffect(() => {
    if (message) {
      displayToast(message, variant);
    }
    console.log('message', message);
    console.log('variant', variant);
  }, [message, variant]);

  // ToastContainer bileşeni, toast'ları göstermek için kullanılır
  return <ToastContainer />;
};

AppMessageView.propTypes = {
  message: PropTypes.string.isRequired, // message prop'unun bir string ve gerekli olduğunu belirtin
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired, // variant prop'unun belirli string değerlerinden biri ve gerekli olduğunu belirtin
};

export default AppMessageView;
