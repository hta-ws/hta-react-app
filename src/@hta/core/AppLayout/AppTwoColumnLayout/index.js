import React, { useState } from 'react';
import { Container } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getVisibleMenuItems } from 'selectors/menuSelectors'; // Varsayalım bu selector rol bazlı filtrelenmiş menü öğelerini getiriyor
import logoSm from 'assets/images/logo/logo.png';
import RecursiveMenu from './RecursiveMenu';
// Recursive Menu List Component

const AppTwoColumnLayout = () => {
  const [activeMenu, setActiveMenu] = useState(null); // Seçili ana menü öğesinin state'i
  const visibleMenuItems = useSelector(getVisibleMenuItems); // Rol bazlı filtrelenmiş menü öğelerini al

  // Menü öğesine tıklandığında çalışacak fonksiyon
  const handleMenuItemClick = (item) => {
    if (item.subItems?.length > 0) {
      // If the item has subItems, set active menu and remove the 'twocolumn-panel' class from the body
      setActiveMenu(item);
      document.body.classList.remove('twocolumn-panel');
    } else {
      // If the item has no subItems, reset the active menu and add the 'twocolumn-panel' class to the body
      setActiveMenu(null);
      document.body.classList.add('twocolumn-panel');
    }
  };

  return (
    <div id='scrollbar'>
      <Container fluid>
        {/* two-column-menu */}
        <div id='two-column-menu'>
          {/* <SimpleBar className='twocolumn-iconview'>
            <Link to='#' className='logo'>
              <img src={logoSm} alt='' height='44' />
            </Link>
            {visibleMenuItems.map((item) => (
              <React.Fragment key={item.id}>
                {item.icon && (
                  <li
                    className={`iconView${activeMenu?.id === item.id ? ' active' : ''}`}
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
                )}
              </React.Fragment>
            ))}
          </SimpleBar> */}

          <SimpleBar className='twocolumn-iconview'>
            <Link to='#' className='logo'>
              <img src={logoSm} alt='' height='44' />
            </Link>
            {visibleMenuItems.map((item) => (
              <React.Fragment key={item.id}>
                {item.subItems?.length > 0 ? (
                  <li
                    className={`m-1 p-1 iconView${activeMenu?.id === item.id ? ' active' : ''}`}
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
                ) : (
                  <li
                    className={`m-1 iconView${activeMenu?.id === item.id ? ' active' : ''}`}
                  >
                    <Link
                      onClick={() => handleMenuItemClick(item)}
                      to={item.link || '#'}
                      subitems={item.id}
                      className='nav-icon'
                      data-bs-toggle='collapse'
                    >
                      <i className={item.icon}></i>
                    </Link>
                    <div className='text-white'>{item.label}</div>
                  </li>
                )}
              </React.Fragment>
            ))}
          </SimpleBar>
        </div>

        {activeMenu && activeMenu.subItems && (
          <SimpleBar id='navbar-nav' className='navbar-nav'>
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
