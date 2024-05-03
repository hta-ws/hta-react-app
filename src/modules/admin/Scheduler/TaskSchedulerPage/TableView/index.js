import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'modules/admin/Financial/Reports/Components/DataTable';
import AppPromptModal from '@hta/components/AppPromptModal';
import { SchedulerListColumns } from './componets/SchedulerListColumns';
import { toast } from 'react-toastify';
const TableView = ({ data, submitData, handleRefresh, loading }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [runModal, setRunModal] = useState(false);
  const [stopModal, setStopModal] = useState(false);
  const [task, setTask] = useState(null);
  const onClickDeleteTask = (task) => {
    setTask(task);
    setDeleteModal(true);
  };
  const handleDeleteTask = () => {
    if (task) {
      submitData(task, 'DELETE', 'delete-task', (response) => {
        if (response?.code === 0) {
          handleRefresh();

          toast.success('Görev başarıyla silindi!', {
            autoClose: 3000, // 3 saniye sonra otomatik kapanır
          });
        } else {
          // Hata mesajı için daha fazla seçenek sunan toast.error kullanımı
          toast.error(response?.message || 'Bir hata oluştu', {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            // 3 saniye sonra otomatik kapanır
          });
        }
      });
      setDeleteModal(false);
    } else {
      toast.info('Silinecek görev bulunamadı.', {
        autoClose: 3000,
      });
    }
  };

  const handleRunTask = () => {
    setRunModal(false); // Modalı kapat

    const id = task?.id || 0;
    if (id > 0) {
      // Görevi başlatma isteği
      submitData(task, 'POST', 'run-task', (response) => {
        console.log('response', response);
        if (response?.code === 0) {
          // İşlem başarılıysa, başarılı bildirimi yap
          toast.success('Görev başarıyla başlatıldı!', {
            autoClose: 3000, // 3 saniye sonra otomatik kapanır
          });
          handleRefresh();
        } else {
          // İşlem başarısızsa, hata bildirimi yap
          toast.error(response?.message || 'Görev başlatılamadı', {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
    } else {
      // Görev başlatmak için bir ID bulunamadı
      toast.error('Görev başlatmak için geçerli bir ID bulunamadı.', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const onClickRunTask = (task) => {
    setTask(task);
    setRunModal(true);
  };
  const onClickStopTask = (task) => {
    setTask(task);
    setStopModal(true);
  };
  const handleStopTask = () => {
    setStopModal(false); // Modalı kapat

    const id = task?.id || 0;
    if (id > 0) {
      // Görevi başlatma isteği
      submitData(task, 'POST', 'stop-task', (response) => {
        if (response?.code === 0) {
          // İşlem başarılıysa, başarılı bildirimi yap
          toast.success('Görev başarıyla durduruldu', {
            autoClose: 3000, // 3 saniye sonra otomatik kapanır
          });
          handleRefresh();
        } else {
          // İşlem başarısızsa, hata bildirimi yap
          toast.error(response?.message || 'Görev durdurulamadı.', {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
    } else {
      // Görev başlatmak için bir ID bulunamadı
      toast.error('Görev başlatmak için geçerli bir ID bulunamadı.', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const actions = {
    onClickDeleteTask /* ... */,
    onClickRunTask /* ... */,
    onClickStopTask /* ... */,
  };
  const tableColumns = SchedulerListColumns(actions);

  return (
    <>
      {deleteModal && (
        <AppPromptModal
          title='Task Silinecek'
          subject='Task silmek istediğinizden emin misininiz?'
          show={deleteModal}
          onDeleteClick={() => handleDeleteTask()}
          onCloseClick={() => setDeleteModal(false)}
        />
      )}
      {runModal && (
        <AppPromptModal
          title='Görev Çalıştırılacak'
          subject='Görev manuel olarak çalıştırılacak. Emin misiniz?'
          show={runModal}
          onDeleteClick={() => handleRunTask()}
          onCloseClick={() => setRunModal(false)}
        />
      )}
      {stopModal && (
        <AppPromptModal
          title='Görev Durdurulacak'
          subject='Görev manuel olarak durdurulacak. Emin misiniz?'
          show={stopModal}
          onDeleteClick={() => handleStopTask()}
          onCloseClick={() => setStopModal(false)}
        />
      )}
      <DataTable data={data} columns={tableColumns} loading={loading} />;
    </>
  );
};

TableView.propTypes = {
  data: PropTypes.array,
  submitData: PropTypes.func,
  handleRefresh: PropTypes.func,
  loading: PropTypes.bool,
};
export default TableView;
