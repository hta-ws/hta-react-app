import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'reactstrap';
const DisabledLink = ({ to, isEnabled, className, children, title }) => {
  const nClassName = classNames(className, {
    'btn-disabled-c': !isEnabled,
  });

  return isEnabled ? (
    <Link to={to} className={nClassName} title={title}>
      {children}
    </Link>
  ) : (
    <Button className={nClassName} disabled={true}>
      {children}
    </Button>
  );
};

DisabledLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  isEnabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default DisabledLink;
