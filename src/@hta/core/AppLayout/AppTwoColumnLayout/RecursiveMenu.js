import React, { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes'ı import et
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <li className='nav-item'>
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
    </li>
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
  }).isRequired,
};

const RecursiveMenu = ({ items }) => {
  return items.map((item, index) => <MenuItem key={index} item={item} />);
};

// PropTypes ile items'ın beklenen yapısını tanımla
RecursiveMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecursiveMenu;
