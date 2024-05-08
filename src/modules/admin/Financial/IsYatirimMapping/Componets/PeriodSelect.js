import React from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@hta/hooks/APIHooks'; // Update with the actual path

const PeriodSelect = ({ selectedPeriod, setSelectedPeriod }) => {
  const [{ apiData: periodList, loading }] = useGetDataApi({
    controller: 'financial-mapping',
    action: 'get-period-list',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });

  const handleSelect = (id) => {
    setSelectedPeriod(id);
  };

  const activeLabel =
    periodList.find((item) => item.id === selectedPeriod)?.label ||
    'Period Seçiniz';

  return (
    <div className='flex-shrink-0'>
      <UncontrolledDropdown className='dropdown'>
        <DropdownToggle
          className='btn text-muted fs-14 dropdown-toggle'
          tag='button'
          type='button'
        >
          <strong>
            {loading ? 'Loading periods...' : 'Period : ' + activeLabel}
          </strong>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu'>
          {loading ? (
            <DropdownItem className='dropdown-item'>Loading...</DropdownItem>
          ) : periodList.length > 0 ? (
            periodList.map((item) => (
              <DropdownItem
                key={item.id}
                className='dropdown-item'
                onClick={() => handleSelect(item.id)}
              >
                {item.label}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem className='dropdown-item'>
              No data available
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

PeriodSelect.propTypes = {
  selectedPeriod: PropTypes.string.isRequired,
  setSelectedPeriod: PropTypes.func.isRequired,
};

export default PeriodSelect;
