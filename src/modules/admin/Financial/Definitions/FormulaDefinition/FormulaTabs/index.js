import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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
import { useGetDataApi } from '@hta/hooks/APIHooks';
import FormTab from './FormTab';
import RunLogTab from '../../Components/Tabs/RunLogTab';
import ResultTab from '../../Components/Tabs/ResultTab';

const FormulaTabs = ({ onClose, showNewForm, updateApiData }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('1');
  const [title] = useState('Formül Tanımlama');
  const [apiState, apiActions] = useGetDataApi({
    controller: 'formula-definition',
    action: 'get-formula-definition',
    initialData: null,
    params: {},
    initialCall: false,
    method: 'POST',
  });

  // Set active tab to '1' whenever the id changes
  useEffect(() => {
    if (showNewForm) setActiveTab('1');
  }, [showNewForm]);

  const { submitData } = apiActions;
  const toggleTab = (tab) => {
    if (!id && (tab === '2' || tab === '3')) {
      return; // id null ise 2 ve 3 numaralı tabları açmaya çalışma
    }
    setActiveTab(tab);
  };

  const formContent = () => {
    if (showNewForm) {
      return (
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <FormTab
              formData={null}
              onClose={onClose}
              updateApiData={updateApiData}
              showNewForm={showNewForm}
            />
          </TabPane>
        </TabContent>
      );
    }

    return (
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <FormTab
            formData={apiState.apiData}
            updateApiData={updateApiData}
            onClose={onClose}
            apiError={apiState.error}
            submitData={submitData}
            showNewForm={showNewForm}
          />
        </TabPane>
        <TabPane tabId='2'>
          <RunLogTab entityType='formula' entityLevel='id' />
        </TabPane>
        <TabPane tabId='3'>
          <ResultTab modelType={'formula'} />
        </TabPane>
      </TabContent>
    );
  };

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>
          <span className='text-uppercase'>{title}</span>
          <span className='text-muted fw-normal fs-13 fw-500'>
            {' '}
            {title !== '' ? 'Formül Tanımlama' : ' Yeni Formül Tanımlama'}
          </span>
        </h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={onClose}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader>
      <CardBody>
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
              disabled={!id} // Eğer id null ise bu tab'ı disable yap
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              Çalışma Günlüğü
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={!id} // Eğer id null ise bu tab'ı disable yap
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => toggleTab('3')}
            >
              Örnek Sonuçlar
            </NavLink>
          </NavItem>
        </Nav>
        {formContent()}
      </CardBody>
    </Card>
  );
};

FormulaTabs.propTypes = {
  onClose: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  updateApiData: PropTypes.func.isRequired,
};

export default FormulaTabs;
