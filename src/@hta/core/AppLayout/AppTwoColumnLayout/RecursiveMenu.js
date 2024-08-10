import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import StockHeader from './components/StockHeader'; // Bileşeni import et

// Bileşen haritası
const componentsMap = {
  StockHeader: StockHeader,
};

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // `renderer` kontrolü
  if (typeof item.renderer === 'function') {
    return <>{item.renderer({ label: item.label })}</>;
  }

  if (typeof item.renderer === 'string' && componentsMap[item.renderer]) {
    const Component = componentsMap[item.renderer];
    return (
      <>
        <Component label={item.label} />
      </>
    );
  }

  return (
    <>
      <Link
        to={item.link || '#'}
        onClick={item.subItems ? toggle : null}
        className='nav-link'
        data-bs-toggle={item.subItems ? 'collapse' : ''}
      >
        {item.label}
        {item.badgeName && (
          <span className={`badge badge-pill bg-${item.badgeColor}`}>
            {item.badgeName}
          </span>
        )}
      </Link>
      {item.subItems && (
        <Collapse isOpen={isOpen}>
          <ul className='nav nav-sm flex-column'>
            {item.subItems.map((subItem, index) => (
              <MenuItem key={index} item={subItem} />
            ))}
          </ul>
        </Collapse>
      )}
    </>
  );
};

// PropTypes ile item'ın beklenen yapısını tanımla
MenuItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    label: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(PropTypes.object),
    badgeName: PropTypes.string,
    badgeColor: PropTypes.string,
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), // renderer kontrolü
  }).isRequired,
};

const RecursiveMenu = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </>
  );
};

// PropTypes ile items'ın beklenen yapısını tanımla
RecursiveMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecursiveMenu;
