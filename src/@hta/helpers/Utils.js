import React from 'react';
import { useIntl } from 'react-intl';
// import {useMediaQuery, useTheme} from '@mui/material';

// export const useWidth = () => {
//   const theme = useTheme();
//   const keys = [...theme.breakpoints.keys].reverse();
//   return (
//     keys.reduce((output, key) => {
//       const matches = useMediaQuery(theme.breakpoints.up(key));
//       return !output && matches ? key : output;
//     }, null) || 'xs'
//   );
// };

export const getBreakPointsValue = (valueSet, breakpoint) => {
  if (typeof valueSet === 'number') return valueSet;
  switch (breakpoint) {
    case 'xs':
      return valueSet.xs;
    case 'sm':
      return valueSet.sm || valueSet.xs;
    case 'md':
      return valueSet.md || valueSet.sm || valueSet.xs;
    case 'lg':
      return valueSet.lg || valueSet.md || valueSet.sm || valueSet.xs;
    default:
      return (
        valueSet.xl || valueSet.lg || valueSet.md || valueSet.sm || valueSet.xs
      );
  }
};

export const getFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  let k = 1024,
    dm = 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const multiPropsFilter = (products, filters, stringKey = 'title') => {
  const filterKeys = Object.keys(filters);
  return products.filter((product) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      // Loops again if product[key] is an array (for material attribute).
      if (Array.isArray(product[key])) {
        return product[key].some((keyEle) => filters[key].includes(keyEle));
      }
      console.log('key', key, filters[key], product[key]);
      if (key === stringKey) {
        return product[key].toLowerCase().includes(filters[key].toLowerCase());
      }
      return filters[key].includes(product[key]);
    });
  });
};

// 'intl' service singleton reference
let intl;

export function IntlGlobalProvider({ children }) {
  intl = useIntl();
  // Keep the 'intl' service reference
  return children;
}

export const appIntl = () => {
  return intl;
};

/**
 * Changes the body attribute
 */
export const changeHTMLAttribute = (attribute, value) => {
  if (document.documentElement)
    document.documentElement.setAttribute(attribute, value);
  return true;
};

export const formatNumber = (number) => {
  // Format the number as per Turkish locale
  // This is a placeholder, you would implement the actual formatting logic
  if (number == null) {
    return <span>-</span>;
  }

  // Check for 0 and return an empty string
  if (number == 0) {
    return <span>-</span>; // or return <span>{''}</span>; for clarity
  }
  const browserLocale = navigator.language;
  const formattedNumber = new Intl.NumberFormat(browserLocale).format(number);

  return <span>{formattedNumber}</span>;
};
export const useSelectOptionsFromTableData = (
  tableData,
  valueKey,
  labelKey,
  blankData = false,
) => {
  return React.useMemo(() => {
    const uniqueOptions = new Set();
    const options = [];
    if (blankData) options.push(blankData);
    tableData.forEach((row) => {
      const value = row[valueKey];
      const label = row[labelKey];

      if (!uniqueOptions.has(value)) {
        uniqueOptions.add(value);
        options.push({ value, label });
      }
    });

    return options;
  }, [tableData, valueKey, labelKey, blankData]);
};
