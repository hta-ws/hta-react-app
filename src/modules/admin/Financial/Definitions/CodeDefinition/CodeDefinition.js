import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFsTemplateList } from 'toolkit/selectors';
import DefinitionList from './DefinitionList';
import DefinitionTabs from './DefinitionTabs';
import TemplateSelect from '../Components/TemplateSelect';
import AppMetaTags from '@hta/components/AppMetaTags';
import { Button, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CodeDefinitionPage = () => {
  const { template, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewForm, setShowNewForm] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  const fsTemplateList = useSelector(selectFsTemplateList) || [];

  useEffect(() => {
    if (template) {
      const matchedTemplate = fsTemplateList.find(
        (item) => item.slug === template,
      );
      if (matchedTemplate) {
        setCurrentTemplate(matchedTemplate);
      } else {
        setCurrentTemplate(null);
      }
    } else {
      setCurrentTemplate(null);
    }

    // Template değiştiğinde yeni formu kapat
    setShowNewForm(false);
  }, [template, fsTemplateList]);

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
              <Button
                color='primary'
                onClick={handleNewRecord}
                className='ms-2'
              >
                <i className='ri-add-fill align-bottom me-1'></i>
                Yeni Kayıt Ekle
              </Button>
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
              <Col md={id || showNewForm ? '6' : '12'}>
                <DefinitionList data={[]} isLoading={false} />{' '}
                {/* API sonuçları burada kullanılacak */}
              </Col>
              {(id || showNewForm) && (
                <Col md={6}>
                  <DefinitionTabs
                    onClose={handleCloseForm}
                    showNewForm={showNewForm}
                  />
                </Col>
              )}
            </Row>
          )}
        </CardBody>
      </Card>
    </DndProvider>
  );
};

export default CodeDefinitionPage;
