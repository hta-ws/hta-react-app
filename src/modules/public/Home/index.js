import React from 'react';
import AppKanbanBoard from '@hta/components/AppKanbanBoard';

const Home = () => {
  document.title = ' Landing | Velzon - React Admin & Dashboard Template';

  return (
    <React.Fragment>
      <div className='layout-wrapper landing'>
        <AppKanbanBoard />
      </div>
    </React.Fragment>
  );
};

export default Home;
