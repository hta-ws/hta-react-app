import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import TableView from './TableView';
import FormView from './FormView';
import AppMetaTags from '@hta/components/AppMetaTags';
import StockCodeSelect from './Componets/StockCodeSelect';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { TableViewBar } from './styled';
import PeriodSelect from './Componets/PeriodSelect';
import PopulationKeysModal from './PopulationKeysModal';
import SearchBox from './SelectIfrsCode/SearchBox';
import { useDebounce } from '@hta/hooks/useDebounce';

const IsYatirimMapping = () => {
  const [stokCode, setStokCode] = useState('THYAO');
  const [toogleInfo, setToogleInfo] = useState(false);

  const [globalFilter, setGlobalFilter] = useState('');
  const toggle = () => setToogleInfo(!toogleInfo);
  const { viewmode = 'list' } = useParams();
  const title = 'İş YAtırım eşleştirme';
  const description = 'İş Yatırım eşleştirme';
  const [selectedPeriod, setSelectedPeriod] = useState(202309);
  const [{ apiData, loading, error }, apiActions] = useGetDataApi({
    controller: 'financial-mapping',
    action: 'get-isyatirim-data',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });
  const { data, kapUrl, isyatirimUrl } = apiData;

  const handleRefresh = () => {
    setGlobalFilter('');
    apiActions.setQueryParams({ stockCode: stokCode, period: selectedPeriod });
  };
  useEffect(() => {
    // This will ensure the API is called on component mount
    apiActions.setQueryParams({ stockCode: stokCode, period: selectedPeriod });
  }, [stokCode, selectedPeriod]);

  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  return (
    <>
      <AppMetaTags title={title} description={description} />
      {/* <Row className='p-6 m-b2'>
        <Col sm={4}>
          <StockCodeSelect
            selectedStockCode={stokCode}
            setSelectedStockCode={setStokCode}
          />
        </Col>
      </Row> */}
      <Row>
        <Col xl={viewmode === 'edit' ? 7 : 12} md={12}>
          <Card>
            <CardHeader className='d-flex justify-content-between align-items-center'>
              <h3 className='card-title'>
                İş Yatırım Bilançosu ile Kap Bilanço Eşleştirmesi
              </h3>
            </CardHeader>
            <CardBody>
              <Row className='mb-3'>
                <Col md={4}>
                  <SearchBox value={globalFilter} onChange={setGlobalFilter} />
                </Col>
                <Col className='col-md-auto ms-auto '>
                  <div className='selector-group d-flex'>
                    <StockCodeSelect
                      selectedStockCode={stokCode}
                      setSelectedStockCode={setStokCode}
                      className='me-3'
                      styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                    />
                    <PeriodSelect
                      selectedPeriod={selectedPeriod}
                      setSelectedPeriod={setSelectedPeriod}
                    />
                    <div className='me-3 align-self-center fw-bold fs-6'>
                      <a
                        href={isyatirimUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Button color='light'>
                          İşYatırım
                          <i className='ri-external-link-fill align-bottom ms-2'></i>
                        </Button>
                      </a>
                    </div>
                    <div className='me-3 align-self-center fw-bold fs-6'>
                      <a
                        href={kapUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Button color='light'>
                          Kap Bilanço
                          <i className='ri-external-link-fill align-bottom ms-2'></i>
                        </Button>
                      </a>
                    </div>
                    <div className='me-3 align-self-center fw-bold fs-6'>
                      <Button color='info' onClick={toggle}>
                        Hesaplama Anahtarları
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <TableViewBar>
                <TableView
                  data={data}
                  loading={loading}
                  handleRefresh={handleRefresh}
                  error={error}
                  debouncedSearchTerm={debouncedSearchTerm}
                  setGlobalFilter={setGlobalFilter}
                />
              </TableViewBar>
              <PopulationKeysModal isOpen={toogleInfo} toggle={toggle} />
            </CardBody>
          </Card>
        </Col>
        {viewmode == 'edit' && (
          <div className='col-xl-5 col-md-12'>
            <FormView />
          </div>
        )}
      </Row>
    </>
  );
};

export default IsYatirimMapping;
