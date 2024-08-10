import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { withRouter } from '@hta/hooks/withRouter';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Bileşen haritası
import StockHeader from '../AppTwoColumnLayout/components/StockHeader';
// Bileşen haritası oluşturuyoruz
const componentsMap = {
  StockHeader: StockHeader,
};

const VerticalLayout = (props) => {
  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  const selectLayoutState = (state) => state.layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      leftsidbarSizeType: layout.leftsidbarSizeType,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
      layoutType: layout.layoutType,
    }),
  );

  const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useSelector(
    selectLayoutProperties,
  );

  const resizeSidebarMenu = useCallback(() => {
    // ... mevcut resizeSidebarMenu içeriği ...
  }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);

  useEffect(() => {
    window.addEventListener('resize', resizeSidebarMenu, true);
  }, [resizeSidebarMenu]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById('navbar-nav');
      const items = ul.getElementsByTagName('a');
      let itemsArray = [...items];
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === 'vertical') {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add('active');
    let parentCollapseDiv = item.closest('.collapse.menu-dropdown');

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add('show');
      parentCollapseDiv.parentElement.children[0].classList.add('active');
      parentCollapseDiv.parentElement.children[0].setAttribute(
        'aria-expanded',
        'true',
      );
      if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
        parentCollapseDiv.parentElement
          .closest('.collapse')
          .classList.add('show');
        if (
          parentCollapseDiv.parentElement.closest('.collapse')
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.classList.add('active');
        if (
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
        ) {
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .classList.add('show');
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .previousElementSibling.classList.add('active');
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains('active'));

    actiItems.forEach((item) => {
      if (item.classList.contains('menu-link')) {
        if (!item.classList.contains('active')) {
          item.setAttribute('aria-expanded', false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
      }
      if (item.classList.contains('nav-link')) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
        item.setAttribute('aria-expanded', false);
      }
      item.classList.remove('active');
    });
  };

  const renderMenuItem = (item, key) => {
    // Eğer `renderer` bir fonksiyon ise, onu render edin
    if (typeof item.renderer === 'function') {
      return (
        <React.Fragment key={key}>
          {item.renderer({ label: item.label })}
        </React.Fragment>
      );
    }

    // Eğer `renderer` bir bileşen adı ise, bileşeni haritadan alıp render edin
    if (typeof item.renderer === 'string' && componentsMap[item.renderer]) {
      const Component = componentsMap[item.renderer];
      return (
        <React.Fragment key={key}>
          <Component label={item.label} />
        </React.Fragment>
      );
    }

    // Eğer `renderer` yoksa, varsayılan menü öğesini render edin
    return (
      <li className='nav-item' key={key}>
        <Link className='nav-link menu-link' to={item.link ? item.link : '/#'}>
          {item.icon && <i className={item.icon}></i>} <span>{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <React.Fragment>
      {/* Menü öğelerini render etme */}
      {(navData || []).map((item, key) => {
        return (
          <React.Fragment key={key}>
            {item.isHeader ? (
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
            ) : item.subItems ? (
              <li className='nav-item'>
                <Link
                  onClick={item.click}
                  className='nav-link menu-link'
                  to={item.link ? item.link : '/#'}
                  data-bs-toggle='collapse'
                >
                  {item.icon && <i className={item.icon}></i>}
                  <span>{item.label}</span>
                </Link>
                <Collapse
                  className='menu-dropdown'
                  isOpen={item.stateVariables}
                  id='sidebarApps'
                >
                  <ul className='nav nav-sm flex-column'>
                    {item.subItems.map((subItem, subKey) => (
                      <React.Fragment key={subKey}>
                        {renderMenuItem(subItem, subKey)}
                      </React.Fragment>
                    ))}
                  </ul>
                </Collapse>
              </li>
            ) : (
              renderMenuItem(item, key)
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  router: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  layoutType: PropTypes.string.isRequired,
};

export default withRouter(VerticalLayout);
