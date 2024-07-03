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
  Spinner,
  Alert,
} from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import FormTab from './FormTab';
import RunLogTab from './RunLogTab';
import ResultTab from './ResultTab';

const DefinitionTabs = ({ onClose, showNewForm }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('1');
  const [title, setTitle] = useState('Formül Tanımlama');
  const [apiState, apiActions] = useGetDataApi({
    controller: 'definition',
    action: 'get-code-definition',
    initialData: null,
    params: {},
    initialCall: false,
    method: 'POST',
  });

  useEffect(() => {
    if (id) {
      apiActions.setQueryParams({ id: parseInt(id, 10) });
    }
  }, [id]);

  const toggleTab = (tab) => {
    if (!id && (tab === '2' || tab === '3' || tab === '4')) {
      return; // id null ise 2, 3 ve 4 numaralı tabları açmaya çalışma
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!id) apiActions.resetData();
  }, [showNewForm, id]);
  const formContent = () => {
    if (showNewForm) {
      return (
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <FormTab
              formData={null}
              updateApiData={apiActions.updateApiData}
              onClose={onClose}
              apiError={apiState.error}
            />
          </TabPane>
        </TabContent>
      );
    }

    if (apiState.loading) {
      return <Spinner color='primary' />;
    }

    if (apiState.error) {
      return <Alert color='danger'>{apiState.error}</Alert>;
    }

    if (!apiState.apiData) {
      return <Alert color='danger'>ID bulunamadı</Alert>;
    }

    return (
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <FormTab
            formData={apiState.apiData}
            updateApiData={apiActions.updateApiData}
            onClose={onClose}
            apiError={apiState.error}
          />
        </TabPane>
        <TabPane tabId='2'>
          <RunLogTab formData={apiState.apiData} />
        </TabPane>
        <TabPane tabId='3'>
          <ResultTab formData={apiState.apiData} />
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
            {title !== '' ? 'Formül Tanımlama  ' : ' Yeni Formül Tanımlama'}
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

DefinitionTabs.propTypes = {
  onClose: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
};

export default DefinitionTabs;
