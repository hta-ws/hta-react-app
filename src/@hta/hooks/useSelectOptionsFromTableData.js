import React from 'react';

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
  }, [tableData, valueKey, labelKey]);
};
