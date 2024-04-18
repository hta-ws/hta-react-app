import React, { useState, useRef, useEffect } from 'react';
import {
  CardBody,
  CardHeader,
  Card,
  Row,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import DefinitionTable from './DefinitionTable';
const StyledSimpleBar = styled(SimpleBar)`
  height: calc(100vh - 186px);
`;

const IfrsCodeDefinitionsPage = () => {
  // //   const [selectedRow, setSelectedRow] = useState(null);
  //   const [sortBy, setsortBy] = useState('Owner');

  //   const handlesortBy = (sortBy) => {
  //     setsortBy(sortBy);
  //   };

  const sortbyname = [
    {
      options: [
        { label: 'Owner', value: 'Owner' },
        { label: 'Company', value: 'Company' },
        { label: 'Location', value: 'Location' },
      ],
    },
  ];

  //   const toggle = () => {
  //     if (modal) {
  //       setModal(false);
  //     } else {
  //       setModal(true);
  //     }
  //   };
  const [, setDropdownOptions] = useState([]);
  const [selectedTypeId] = useState(0); // '0' varsayılan olarak 'Tümü' anlamına gelir
  //   const [, setSelectedMonth] = useState('Tümü');
  const simpleBarRef = useRef(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const controller = 'financial-management';
  const action = 'get-report-code-definition';
  const productId = 1;

  const [{ loading, apiData, error }, { setQueryParams }] = useGetDataApi(
    controller,
    action,
    [],
    { id: 0 },
    true,
    null,
    'GET',
  );
  const [filteredData, setFilteredData] = useState(apiData);
  useEffect(() => {
    if (!apiData) {
      // Eğer API'dan henüz veri gelmediyse
      setQueryParams({ id: productId });
    }
  }, []); // sadece productId değiştiğinde çalış

  useEffect(() => {
    if (selectedTypeId === 0) {
      // 'Tümü' seçildiğinde
      setFilteredData(apiData);
    } else {
      // Belirli bir 'bilanco_tipi' seçildiğinde
      const filtered = apiData.filter(
        (item) => item.ifrs_id === selectedTypeId,
      );
      setFilteredData(filtered);
    }
  }, [selectedTypeId, apiData]);

  useEffect(() => {
    if (apiData) {
      const groups = apiData.reduce((acc, item) => {
        const key = item.bilanco_tipi;
        if (!acc[key]) {
          acc[key] = {
            id: item.ifrs_id, // ifrs_id benzersiz bir değer olduğunu varsayıyoruz.
            label: key,
          };
        }
        return acc;
      }, {});

      // 'Tümü' seçeneğini de ekleyelim
      setDropdownOptions([{ id: 0, label: 'Tümü' }, ...Object.values(groups)]);
    }
  }, [apiData]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Row>
      <Col md={selectedRowId ? '8' : '12'}>
        <Card className='mb-0'>
          <CardHeader className='d-flex justify-content-between align-items-center'>
            <h5 className='mb-0'>Başlık</h5>
            <div>
              {/* <UncontrolledDropdown>
                <DropdownToggle
                  tag='button'
                  className='btn btn-soft-primary btn-sm'
                >
                  <span className='text-uppercase'>
                    {selectedMonth}
                    <i className='mdi mdi-chevron-down align-middle ms-1'></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu dropdown-menu-end'>
                  {dropdownOptions.map((option) => (
                    <DropdownItem
                      key={option.id}
                      onClick={() =>
                        onChangeChartPeriod(option.id, option.label)
                      }
                      className={selectedMonth === option.label ? 'active' : ''}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <button
                type='button'
                className='btn btn-ghost-secondary material-shadow-none btn-icon btn-sm fs-16'
              >
                <i className='ri-refresh-line align-bottom'></i>
              </button>
              <button
                type='button'
                className='btn btn-ghost-secondary material-shadow-none btn-icon btn-sm fs-16'
              >
                <i className='ri-refresh-line align-bottom'></i>
              </button>
            </div>
          </CardHeader>
          <CardBody>
            <Row className='g-3'>
              <Col md={3}>
                <div className='search-box'>
                  <Input
                    type='text'
                    className='form-control search'
                    placeholder='Search for deals...'
                  />
                  <i className='ri-search-line search-icon'></i>
                </div>
              </Col>
              <div className='col-md-auto ms-auto'>
                <div className='d-flex hastck gap-2 flex-wrap'>
                  <div className='d-flex align-items-center gap-2'>
                    <span className='text-muted'>Sort by: </span>
                    <Select
                      className='mb-0'
                      //   value={sortBy}
                      onChange={() => {
                        // handlesortBy();
                      }}
                      options={sortbyname}
                      id='choices-single-default'
                      defaultInputValue='Owner'
                    ></Select>
                  </div>
                  <button
                    className='btn btn-success'
                    //    onClick={toggle}
                  >
                    <i className='ri-add-fill align-bottom me-1'></i> Add Deals
                  </button>
                  <button
                    className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
                    //    onClick={toggle}
                  >
                    <i className='ri-add-fill align-bottom me-1'></i>
                  </button>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      href='#'
                      className='btn btn-soft-info btn-icon fs-14'
                      tag='button'
                    >
                      <i className='ri-refresh-line'></i>
                    </DropdownToggle>
                    <DropdownMenu className='dropdown-menu-end'>
                      <DropdownItem className='dropdown-item' href='#'>
                        Copy
                      </DropdownItem>
                      <DropdownItem className='dropdown-item' href='#'>
                        Move to pipline
                      </DropdownItem>
                      <DropdownItem className='dropdown-item' href='#'>
                        Add to exceptions
                      </DropdownItem>
                      <DropdownItem className='dropdown-item' href='#'>
                        Switch to common form view
                      </DropdownItem>
                      <DropdownItem className='dropdown-item' href='#'>
                        Reset form view to default
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </Row>
            <ul
              role='tablist'
              className='nav-tabs nav-tabs-custom nav-success nav'
            >
              <li className='nav-item'>
                <a href='#' className='active fw-semibold nav-link'>
                  <i className='ri-store-2-fill me-1 align-bottom'></i> All
                  Orders
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='fw-semibold nav-link'>
                  <i className='ri-checkbox-circle-line me-1 align-bottom'></i>{' '}
                  Delivered
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='fw-semibold nav-link'>
                  <i className='ri-truck-line me-1 align-bottom'></i> Pickups{' '}
                  <span className='badge bg-danger align-middle ms-1'>2</span>
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='fw-semibold nav-link'>
                  <i className='ri-arrow-left-right-fill me-1 align-bottom'></i>{' '}
                  Returns
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='fw-semibold nav-link'>
                  <i className='ri-close-circle-line me-1 align-bottom'></i>{' '}
                  Cancelled
                </a>
              </li>
            </ul>
            <StyledSimpleBar ref={simpleBarRef}>
              <DefinitionTable
                data={filteredData}
                selectedRowId={selectedRowId}
                setSelectedRowId={setSelectedRowId}
              ></DefinitionTable>
            </StyledSimpleBar>
          </CardBody>
        </Card>
      </Col>

      {selectedRowId && (
        <Col md={4}>
          <Card className='mb-0'>
            <CardHeader>
              <div className='d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Başlık</h5>
                <button
                  type='button'
                  className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email'
                  onClick={() => setSelectedRowId('')}
                >
                  <i className='ri-close-fill align-bottom'></i>
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <StyledSimpleBar ref={simpleBarRef}>dd </StyledSimpleBar>
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default IfrsCodeDefinitionsPage;
