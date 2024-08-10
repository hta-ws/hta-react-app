import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getVisibleMenuItems } from 'selectors/menuSelectors';
import logoSm from 'assets/images/logo/logo.png';
import RecursiveMenu from './RecursiveMenu';
import { useAuthUser } from '@hta/hooks/AuthHooks';
import StockHeader from './components/StockHeader'; // StockHeader bileşeni

import logoDark from '../../../../assets/images/logo-dark.png';
import logoLight from '../../../../assets/images/logo-light.png';
// Bileşen haritası
const componentsMap = {
  StockHeader: StockHeader,
};

const AppTwoColumnLayout = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { user } = useAuthUser();
  const userRole = user ? user.role : 'guest';

  const visibleMenuItems = useSelector((state) =>
    getVisibleMenuItems(state, userRole),
  );

  useEffect(() => {
    // "stock-dashboard" id'li öğeyi bul ve activeMenu olarak ayarla
    const stockDashboardItem = visibleMenuItems.find(
      (item) => item.id === 'stock-dashboard',
    );

    if (stockDashboardItem && stockDashboardItem.subItems) {
      setActiveMenu(stockDashboardItem);
      document.body.classList.remove('twocolumn-panel');
    } else {
      setActiveMenu(null);
      document.body.classList.add('twocolumn-panel');
    }
  }, [visibleMenuItems]);

  const handleMenuItemClick = (item) => {
    if (item.subItems?.length > 0) {
      setActiveMenu(item);
      document.body.classList.remove('twocolumn-panel');
    } else {
      setActiveMenu(null);
      document.body.classList.add('twocolumn-panel');
    }
  };

  const renderMenuItem = (item) => {
    // Eğer `renderer` bir fonksiyon ise, onu render edin
    if (typeof item.renderer === 'function') {
      return (
        // <li key={item.id} className='nav-item'>
        <>{item.renderer({ label: item.label })}</>
        // </li>
      );
    }

    // Eğer `renderer` bir bileşen adı ise, bileşeni haritadan alıp render edin
    if (typeof item.renderer === 'string' && componentsMap[item.renderer]) {
      const Component = componentsMap[item.renderer];
      return (
        // <li key={item.id} className='nav-item'>
        <>
          <Component label={item.label} />
        </>
        // </li>
      );
    }

    // Eğer `renderer` yoksa, varsayılan menü öğesini render edin
    return (
      <li
        key={item.id}
        className={`m-1 p-1 iconView${
          activeMenu?.id === item.id ? ' active' : ''
        }`}
      >
        <Link
          onClick={() => handleMenuItemClick(item)}
          to='#'
          subitems={item.id}
          className='nav-icon'
          data-bs-toggle='collapse'
        >
          <i className={item.icon}></i>
        </Link>
        <div className='text-white'>{item.label}</div>
      </li>
    );
  };

  return (
    <div id='scrollbar'>
      <Container fluid>
        {/* two-column-menu */}
        <div id='two-column-menu'>
          <SimpleBar className='twocolumn-iconview'>
            <Link to='#' className='logo'>
              <img src={logoSm} alt='' height='44' />
            </Link>
            {visibleMenuItems.map((item) => renderMenuItem(item))}
          </SimpleBar>
        </div>

        {activeMenu && activeMenu.subItems && (
          <SimpleBar id='navbar-nav' className='navbar-nav'>
            <div className='navbar-brand-box'>
              <Link to='/' className='logo logo-dark'>
                <span className='logo-sm'>
                  <img src={logoSm} alt='' height='22' />
                </span>
                <span className='logo-lg'>
                  <img src={logoDark} alt='' height='17' />
                </span>
              </Link>

              <Link to='/' className='logo logo-light mb-2'>
                <span className='logo-sm'>
                  <img src={logoSm} alt='' height='22' />
                </span>
                <span className='logo-lg'>
                  <img src={logoLight} alt='' height='17' />
                </span>
              </Link>
              <button
                // onClick={addEventListenerOnSmHoverMenu}
                type='button'
                className='btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover'
                id='vertical-hover'
              >
                <i className='ri-record-circle-line'></i>
              </button>
            </div>
            <li className='nav-item'>
              <div className='menu-dropdown collapse show'>
                <RecursiveMenu items={activeMenu.subItems} />
              </div>
            </li>
          </SimpleBar>
        )}
      </Container>
    </div>
  );
};

export default AppTwoColumnLayout;
