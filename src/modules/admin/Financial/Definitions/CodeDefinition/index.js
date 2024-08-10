import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFsTemplateList, selectFsTemplateId } from 'toolkit/selectors';
import { setFsTemplateId } from 'toolkit/actions';
import { useGetDataApi } from '@hta/hooks/APIHooks';

import TemplateSelect from '../Components/TemplateSelect';
import AppMetaTags from '@hta/components/AppMetaTags';
import { Button, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RunLogModal from './RunLogModal';
import CodeDefinitionList from './CodeDefinitionList';
import CodeDefinitionTabs from './CodeDefinitionTabs';

const CodeDefinition = () => {
  const { template, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showNewForm, setShowNewForm] = useState(false);
  const [showRunLogModal, setShowRunLogModal] = useState(false);

  const fsTemplateList = useSelector(selectFsTemplateList) || [];
  const selectedTemplateId = useSelector(selectFsTemplateId);

  const [apiState, apiActions] = useGetDataApi({
    controller: 'definition',
    action: 'get-code-definition-list',
    method: 'POST',
    initialData: [],
  });

  useEffect(() => {
    if (template) {
      const matchedTemplate = fsTemplateList.find(
        (item) => item.slug === template,
      );
      if (matchedTemplate) {
        dispatch(setFsTemplateId(matchedTemplate.id));
      } else {
        dispatch(setFsTemplateId(null));
      }
    } else if (selectedTemplateId) {
      const matchedTemplate = fsTemplateList.find(
        (item) => item.id === selectedTemplateId,
      );
      if (matchedTemplate) {
        navigate(`${getBasePath()}/${matchedTemplate.slug}`);
      }
    } else {
      dispatch(setFsTemplateId(null));
    }

    // Template değiştiğinde yeni formu kapat
    // setShowNewForm(false);
  }, [template, fsTemplateList, dispatch, selectedTemplateId, navigate]);

  const currentTemplate = fsTemplateList.find(
    (item) => item.id === selectedTemplateId,
  );
  console.log('id', id, ' showNewForm', showNewForm);
  useEffect(() => {
    if (id) {
      setShowNewForm(false);
    }
  }, [id]);

  const getBasePath = () => {
    const parts = location.pathname.split('/');
    if (template && id) {
      return parts.slice(0, -2).join('/');
    } else if (template) {
      return parts.slice(0, -1).join('/');
    }
    return parts.join('/');
  };

  const handleNewRecord = () => {
    setShowNewForm(true);
    navigate(`${getBasePath()}/${template}`);
  };

  const handleCloseForm = () => {
    navigate(`${getBasePath()}/${template}`);
    setShowNewForm(false);
  };

  const handleShowRunLogModal = () => {
    setShowRunLogModal(true);
  };

  const handleCloseRunLogModal = () => {
    setShowRunLogModal(false);
  };

  const cardStyle = {
    height: 'calc(100vh - 200px)',
    backgroundColor: 'var(--vz-body-bg)',
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppMetaTags
        title='Rapor Formul ve Hesaplama Tanımlamaları'
        description='Rapor Kodları ve Etiketleri Tanımlamak için kullanılır'
      />
      <Card style={cardStyle}>
        <CardHeader className='d-flex justify-content-between align-items-center'>
          <h2>Rapor Formul ve Hesaplama Tanımlamaları</h2>
          <div className='d-flex align-items-center'>
            <TemplateSelect />
            {currentTemplate && (
              <>
                <Button
                  color='primary'
                  onClick={handleNewRecord}
                  className='ms-2'
                >
                  <i className='ri-add-fill align-bottom me-1'></i>
                  Yeni Kayıt Ekle
                </Button>
                <Button
                  color='info'
                  onClick={handleShowRunLogModal}
                  className='ms-2'
                >
                  Run Log
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardBody style={cardStyle}>
          {!template ? (
            <div>Lütfen bir şablon seçin</div>
          ) : !currentTemplate ? (
            <div>Geçersiz şablon, lütfen geçerli bir şablon seçin</div>
          ) : (
            <Row className='gx-3'>
              <Col md={id || showNewForm ? '3' : '12'}>
                <CodeDefinitionList
                  apiState={apiState}
                  apiActions={apiActions}
                />
              </Col>
              {(id || showNewForm) && (
                <Col md={9}>
                  <CodeDefinitionTabs
                    onClose={handleCloseForm}
                    showNewForm={showNewForm}
                    updateApiData={apiActions.updateApiData}
                  />
                </Col>
              )}
            </Row>
          )}
        </CardBody>
      </Card>
      <RunLogModal
        isOpen={showRunLogModal}
        toggle={handleCloseRunLogModal}
        templateId={selectedTemplateId}
      />
    </DndProvider>
  );
};

export default CodeDefinition;
