import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import PropTypes from 'prop-types';
import RunLogTab from './RunLogTab';
import RunLogByTemplateTab from './RunLogByTemplateTab'; // Create this component similar to RunLogTab
import classnames from 'classnames';

const RunLogModal = ({ isOpen, toggle, templateId }) => {
  const [activeTab, setActiveTab] = React.useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Run Log</ModalHeader>
      <ModalBody>
        <Nav tabs className='nav nav-pills nav-custom nav-custom-light mb-3'>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggleTab('1');
              }}
            >
              By ID
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggleTab('2');
              }}
            >
              By Template
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <RunLogTab templateId={templateId} />
          </TabPane>
          <TabPane tabId='2'>
            <RunLogByTemplateTab templateId={templateId} />
          </TabPane>
        </TabContent>
      </ModalBody>
    </Modal>
  );
};

RunLogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  templateId: PropTypes.number.isRequired,
};

export default RunLogModal;
