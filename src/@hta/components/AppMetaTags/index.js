// AppMetaTags.js
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types'; // Import PropTypes
import defaultConfig from 'shared/defaultConfig';

const AppMetaTags = ({ title, description, ogTitle, ogImage }) => {
  // If title is not defined, use siteName from defaultConfig
  const pageTitle = title + ` | ${defaultConfig.siteName}`;
  // If description is not defined, use description from defaultConfig
  const pageDescription = description || defaultConfig.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <link rel='icon' type='image/x-icon' href={defaultConfig.favicon} />
      <meta name='description' content={pageDescription} />
      {ogTitle && <meta property='og:title' content={ogTitle} />}
      {ogImage && <meta property='og:image' content={ogImage} />}
      {/* Additional SEO tags or other head elements can be added here */}
    </Helmet>
  );
};

// Define propTypes for AppMetaTags component
AppMetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogTitle: PropTypes.string,
  ogImage: PropTypes.string,
};

// Define defaultProps for AppMetaTags component
AppMetaTags.defaultProps = {
  title: defaultConfig.siteName,
  description: defaultConfig.description,
  ogTitle: '', // Default values for ogTitle and ogImage can be defined if necessary
  ogImage: '',
};

export default AppMetaTags;
