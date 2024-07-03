import React, { useEffect, useState } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFsTemplateList } from 'toolkit/actions/Admin';
import { selectFsTemplateList } from 'toolkit/selectors';

const TemplateSelect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { template } = useParams();
  const fsTemplateList = useSelector(selectFsTemplateList) || [];
  const [activeTemplate, setActiveTemplate] = useState(null);

  useEffect(() => {
    if (fsTemplateList.length === 0) {
      dispatch(getFsTemplateList());
    }
  }, [dispatch, fsTemplateList]);

  useEffect(() => {
    if (template && fsTemplateList.length > 0) {
      const matchedTemplate = fsTemplateList.find(
        (item) => item.slug === template,
      );
      setActiveTemplate(matchedTemplate || null);
    }
  }, [template, fsTemplateList]);

  const handleSelect = (slug) => {
    navigate(`/admin/financial-result-management/code-definition/${slug}`);
  };

  const activeLabel = activeTemplate
    ? activeTemplate.label
    : 'Bilanço Formatını Seçiniz....';

  return (
    <div className='flex-shrink-0'>
      <UncontrolledDropdown className='dropdown'>
        <DropdownToggle
          className='btn text-muted fs-14 dropdown-toggle'
          tag='button'
          type='button'
        >
          <strong>{activeLabel}</strong>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu'>
          {fsTemplateList.length > 0 ? (
            fsTemplateList.map((item) => (
              <li key={item.id}>
                <DropdownItem
                  className='dropdown-item'
                  onClick={() => handleSelect(item.slug)}
                >
                  {item.label}
                </DropdownItem>
              </li>
            ))
          ) : (
            <DropdownItem className='dropdown-item'>
              No data available
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TemplateSelect;
