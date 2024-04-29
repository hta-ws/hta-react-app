import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';
import classnames from 'classnames';
import { useGetDataApi } from '@hta/hooks/APIHooksOld';

const InformationTabs = ({ formData }) => {
  const [activeTab, setActiveTab] = useState('1');
  const ifrsCode = formData?.ifrs_code || null;
  const formatCode = formData?.financial_statement_format_id || null;
  const controller = 'financial-management';
  const actionGet = 'get-financial-statement-data-by-report-code';

  const [{ apiData }, { setQueryParams }] = useGetDataApi(
    controller,
    actionGet,
    [], // Başlangıç verisi yok
    {
      ifrsCode: ifrsCode,
      formatCode: formatCode,
    },
    false, // İlk çağrıda veri çek
    null, // Callback fonksiyonu yok
    'GET', // Veri çekmek için GET metodu
  );
  const financialData = apiData.financialData || [];
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    setQueryParams({ ifrsCode: ifrsCode, formatCode: formatCode });
  }, [formatCode, ifrsCode]);

  const formatValue = (value) => {
    return parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Bilanço Örnekleri
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Kullanıldığı Yerler
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          {financialData.length > 0 && (
            <Table striped bordered className='table-hover'>
              <thead className='bg-light sticky-top'>
                <tr>
                  <th colSpan='4' className='text-center'>
                    {financialData[0].taxonomy_title_content_tr}
                  </th>
                </tr>
                <tr>
                  <th>Hisse Adı</th>
                  <th className='text-center'>Period</th>
                  <th className='text-end'>Value</th>
                  <th className='text-center'>Kap Linki</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.stock_code}</td>
                    <td className='text-center'>{item.period}</td>
                    <td className='text-end'>{formatValue(item.value)}</td>
                    <td className='text-center'>
                      <a
                        href={`https://www.kap.org.tr/Bildirim/${item.disclosure_index}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {item.disclosure_index}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </TabPane>
        <TabPane tabId='2'>
          <h6>Kullanıldığı Yerler</h6>
          {/* Additional content can be placed here */}
        </TabPane>
      </TabContent>
    </>
  );
};

// Define PropTypes
InformationTabs.propTypes = {
  formData: PropTypes.object,
};

export default InformationTabs;
