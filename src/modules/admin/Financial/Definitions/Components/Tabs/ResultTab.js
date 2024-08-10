import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, Row, Col, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import SimpleBar from 'simplebar-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import AppFormatter from '@hta/components/AppFormatter';
import { selectFsTemplateId, selectFsStock } from 'toolkit/selectors';
import StockSelect from '../StockSelect';
import './ResultTab.css'; // Import the CSS file

const ResultTab = ({ modelType = 'code' }) => {
  const { id } = useParams();
  const fsTemplateId = useSelector(selectFsTemplateId);
  const selectedStockCode = useSelector(selectFsStock);

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'formula-definition',
    action: 'get-formula-result-list',
    method: 'POST',
    initialData: [],
  });

  const { loading, apiData, error } = apiStates;
  const { setQueryParams } = apiActions;

  const [sortDescending, setSortDescending] = useState(true);
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const handleRefresh = () => {
    setQueryParams({
      fs_formula_id: id,
      fs_template_id: fsTemplateId,
      stock_code: selectedStockCode,
      modelType: modelType,
    });
  };

  useEffect(() => {
    handleRefresh();
  }, [id, fsTemplateId, selectedStockCode, setQueryParams, modelType]);

  const pivotData = useMemo(() => {
    if (!apiData || apiData.length === 0) return { periods: [], pivoted: [] };

    const periods = apiData.map((row) => row.period);
    const sortedPeriods = [...periods].sort((a, b) =>
      sortDescending ? b - a : a - b,
    );

    const keys = ['c', 'd', 'y', 'a_c', 'a_d', 'a_y'];
    const pivoted = keys.map((key) => ({
      key,
      values: sortedPeriods.map((period) => {
        const row = apiData.find((row) => row.period === period);
        return row ? row[key] : null;
      }),
    }));

    return { periods: sortedPeriods, pivoted };
  }, [apiData, sortDescending]);

  const handleRowClick = (index) => {
    setActiveRowIndex(index);
  };

  return (
    <Card>
      <CardBody>
        <Row className='m-2 py-2 bg-light'>
          <Col md={6}>
            <StockSelect />
          </Col>
          <Col className='col-md-auto ms-auto'>
            <Button color='info' onClick={handleRefresh} disabled={loading}>
              {loading ? (
                <Spinner size='sm' />
              ) : (
                <i className='ri-refresh-line align-bottom me-1'></i>
              )}
            </Button>
            <div className='form-check form-switch form-switch-right form-switch-md ms-3'>
              <label className='form-label text-muted'>Sort Descending</label>
              <input
                type='checkbox'
                className='form-check-input'
                checked={sortDescending}
                onChange={() => setSortDescending(!sortDescending)}
              />
            </div>
          </Col>
        </Row>
        {apiData && apiData.length > 0 && (
          <Row className='m-2 py-4 bg-light'>
            <Col md={6}>
              <span>
                <strong>{apiData[0].stock_code}</strong> hissesi için{' '}
                <strong>{apiData[0].label}</strong> sonuçları
              </span>
            </Col>
            <Col md={6} className='text-end'>
              {format(new Date(apiData[0].created_at), 'd MMM eeee, HH:mm:ss', {
                locale: tr,
              })}
            </Col>
          </Row>
        )}
        {error && (
          <Row className='m-1 p-2 bg-light'>
            <Col md='12'>
              <div className='alert alert-danger'>
                <strong>İşleminiz sırasında bir hata oluştu:</strong> {error}
              </div>
            </Col>
          </Row>
        )}
        <Row className='m-2 bg-light'>
          <Col>
            <div style={{ height: 'calc(100vh - 360px)' }}>
              <SimpleBar style={{ height: 'calc(100vh - 360px)' }}>
                <table className='table table-hover table-striped table-bordered m-0 p-0'>
                  <thead>
                    <tr>
                      <th>Period</th>
                      {pivotData.periods.map((period, index) => {
                        const disclosureIndex = apiData.find(
                          (row) => row.period === period,
                        )?.disclosure_index;
                        return (
                          <th key={index} className='text-center'>
                            {period}
                            {disclosureIndex && (
                              <a
                                href={`https://www.kap.org.tr/Bildirim/${disclosureIndex}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='ms-2'
                              >
                                <i className='ri-external-link-fill align-bottom'></i>
                              </a>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {pivotData.pivoted.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          activeRowIndex === rowIndex ? 'table-active' : ''
                        }
                        onClick={() => handleRowClick(rowIndex)}
                      >
                        <td className='text-center'>{row.key.toUpperCase()}</td>
                        {row.values.map((value, valueIndex) => (
                          <td key={valueIndex} className='text-end'>
                            <AppFormatter
                              value={value}
                              format={{ type: 'number', decimal: 2 }}
                              Tag='div'
                              className='d-block w-100'
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SimpleBar>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ResultTab.propTypes = {
  modelType: PropTypes.oneOf(['formula', 'code']),
};

export default ResultTab;
