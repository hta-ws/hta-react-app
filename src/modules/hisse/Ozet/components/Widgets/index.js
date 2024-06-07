import React from 'react';
import PropTypes from 'prop-types';
import AppFormatter from '@hta/components/AppFormatter';

const Widgets = ({ item }) => {
  const growthValue = item?.data?.growth || 0;
  let growthIconClass;

  if (growthValue < 0) {
    growthIconClass = 'ri-arrow-right-down-line text-danger';
  } else if (growthValue > 0) {
    growthIconClass = 'ri-arrow-right-up-line text-success';
  } else {
    growthIconClass = 'ri-subtract-line text-muted';
  }

  return (
    <>
      <div className='card-animate card mb-2'>
        <div className='card-body'>
          <div className='d-flex align-items-center'>
            <div className='flex-grow-1 overflow-hidden'>
              <p className='text-uppercase fw-medium text-muted text-truncate mb-0'>
                {item?.properties?.label || 'Label'}
              </p>
            </div>
            <div className='flex-shrink-0'>
              <h5 className='fs-14 mb-0'>
                <i className={`fs-13 align-middle ${growthIconClass}`}></i>{' '}
                {growthValue !== 0 && (
                  <AppFormatter
                    value={growthValue}
                    format={{
                      type: 'number',
                      decimal: 0,
                      suffix: '%',
                      colored: true,
                    }}
                    Tag='span'
                    className=''
                  />
                )}
              </h5>
            </div>
          </div>
          <div className='d-flex align-items-end justify-content-between mt-4'>
            <div>
              <h4 className='fs-22 fw-semibold ff-secondary mb-4'>
                <span className='counter-value' data-target='559.25'>
                  <AppFormatter
                    value={item?.data?.currentValue || 'N/A'}
                    format={
                      item?.properties?.format || { type: 'number', decimal: 2 }
                    }
                    Tag='span'
                    className=''
                  />
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <Card className='m-1 m-sm-0'>
        <CardBody className='d-flex align-items-center '>
          <div className='flex-grow-1 ms-3 d-flex flex-row flex-sm-column align-items-center'>
            <p className='text-uppercase fw-bold fs-12 text-muted mb-0 me-2 mb-sm-1 me-sm-0'>
              {item?.properties?.label || 'Label'}
            </p>
            <h5 className='mb-0 ms-auto ms-sm-0'>
              <AppFormatter
                value={item?.data || 'N/A'}
                format={
                  item?.properties?.format || { type: 'number', decimal: 2 }
                }
                Tag='span'
                className=''
              />
            </h5>
          </div>
        </CardBody>
      </Card> */}
    </>
  );
};

Widgets.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      growth: PropTypes.number,
      currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    properties: PropTypes.shape({
      label: PropTypes.string,
      format: PropTypes.shape({
        type: PropTypes.string,
        decimal: PropTypes.number,
      }),
    }),
  }),
};

export default Widgets;
