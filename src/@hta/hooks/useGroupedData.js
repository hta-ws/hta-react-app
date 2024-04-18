import { useMemo } from 'react';
import _ from 'lodash';

function useGroupedData(data, idField, labelField) {
  return useMemo(() => {
    // Group by the dynamic keys using lodash's groupBy function
    const grouped = _.groupBy(
      data,
      (item) => `${item[idField]}-${item[labelField]}`,
    );

    // Map the grouped entries to the desired output format, ensuring to count the items in each group
    return Object.entries(grouped).map((entry) => {
      const items = entry[1]; // Since we only care about the second element
      return {
        id: items[0][idField],
        label: items[0][labelField],
        count: items.length,
      };
    });
  }, [data, idField, labelField]); // Include the dynamic keys in the dependencies array to recalculate on changes
}

export default useGroupedData;
