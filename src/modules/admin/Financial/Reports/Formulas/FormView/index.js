import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';

import { setSelectedFormulaRecord } from 'toolkit/actions';
import { selectSelectedFormulaRecord } from 'toolkit/selectors/adminSelectors';
import { FormViewBar } from '../../Components/styled';
import FormPan from './Tabs/FormPan';
import RunLogPan from './Tabs/RunLogPan';
import ResultPan from './Tabs/ResultPan';
const FormView = ({ updateTableData }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('1');

  // State to keep track of the active tab

  const selectedRecord = useSelector(selectSelectedFormulaRecord);
  const title = selectedRecord?.s_label || '';
  useEffect(() => {
    if (!selectedRecord.id) setActiveTab('1');
  }, [selectedRecord]);

  const id = selectedRecord?.id || null;
  const toggleTab = (tab) => {
    if (id === null && (tab === '2' || tab === '3' || tab === '4')) {
      return; // id null ise 2, 3 ve 4 numaralı tabları açmaya çalışma
    }
    setActiveTab(tab);
  };

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>
          <span className='text-uppercase'> {title}</span>
          <span className='text-muted fw-normal fs-13 fw-500'>
            {' '}
            {title != '' ? 'Formül Tanımlama  ' : ' Yeni Formül Tanımlama'}
          </span>{' '}
        </h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={() => dispatch(setSelectedFormulaRecord(null))}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader>
      <CardBody>
        <FormViewBar>
          <Nav tabs className='nav nav-pills nav-custom nav-custom-light mb-3'>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => toggleTab('1')}
              >
                Tanımlamalar
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                disabled={id === null} // Eğer id null ise bu tab'ı disable yap
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => toggleTab('2')}
              >
                Çalışma Günlüğü
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                disabled={id === null} // Eğer id null ise bu tab'ı disable yap
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => toggleTab('3')}
              >
                Örnek Sonuçlar
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                disabled={id === null} // Eğer id null ise bu tab'ı disable yap
                className={activeTab === '4' ? 'active' : ''}
                onClick={() => toggleTab('4')}
              >
                Tanımlamalar
              </NavLink>
            </NavItem> */}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <FormPan updateTableData={updateTableData} />
            </TabPane>
            <TabPane tabId='2'>
              <RunLogPan formikValues={selectedRecord} />
            </TabPane>
            <TabPane tabId='3'>
              <ResultPan formikValues={selectedRecord} />
            </TabPane>
          </TabContent>
        </FormViewBar>
      </CardBody>
    </Card>
  );
};
FormView.propTypes = {
  updateTableData: PropTypes.func.isRequired,
};

export default FormView;
