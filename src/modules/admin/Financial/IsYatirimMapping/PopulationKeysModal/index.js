import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '../../Reports/Components/DataTable';
import { TableViewBar } from '../styled';

const PopulationKeysModal = ({ isOpen, toggle }) => {
  const [{ apiData, loading }, apiActions] = useGetDataApi({
    controller: 'financial-mapping',
    action: 'get-formula-keys',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });

  useEffect(() => {
    apiActions.setQueryParams({});
  }, [isOpen]);
  const columnHelper = createColumnHelper(); // Assuming you have this helper from your table library (like TanStack Table)

  const columns = [
    columnHelper.accessor('label', {
      header: 'Anahtar Tanımı',
      cell: (info) => <span>{info.getValue()}</span>, // Renamed from item_desc_tr to match your data field 'label'
    }),
    columnHelper.accessor('ifrs_code', {
      header: 'Kap Anahtar kodu',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('item_code', {
      header: 'İş Yatırım Kodu',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
  ];
  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>
        Hesaplama da Kullanılan Anahtar Listesi
      </ModalHeader>
      <ModalBody>
        <TableViewBar>
          <DataTable columns={columns} data={apiData} loading={loading} />
        </TableViewBar>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={toggle}>
          Kapat
        </Button>
      </ModalFooter>
    </Modal>
  );
};

PopulationKeysModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default PopulationKeysModal;
