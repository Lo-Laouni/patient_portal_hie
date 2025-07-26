import React from 'react';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';

import {
  CardActivities,
  CardNotes,
  CardTasks,
  CardOpportunities,
  CardMessages,
} from '../..';

export const ContactCards = ({
  isLoading,
  tasks,
  activities,
}) => {
  return (
    <div className='dx-card details-card'>
      <TabPanel
        showNavButtons
        focusStateEnabled={false}
        deferRendering={false}
      >
        <TabPanelItem title='Diagnosis'>
          <CardTasks
            isLoading={isLoading}
            tasks={tasks}
          />
        </TabPanelItem>
        <TabPanelItem title='Medications'>
          <CardActivities activities={activities} isLoading={isLoading} />
        </TabPanelItem>
        <TabPanelItem title='Procedures'>
          <CardOpportunities
            isLoading={isLoading}
            tasks={tasks}
          />
        </TabPanelItem>
        <TabPanelItem title='Immunizations'>
          <CardNotes isLoading={isLoading} tasks={tasks} />
        </TabPanelItem>
        <TabPanelItem title='Allergies'>
          <CardMessages isLoading={isLoading} tasks={tasks} />
        </TabPanelItem>
      </TabPanel>
    </div>
  );
};
