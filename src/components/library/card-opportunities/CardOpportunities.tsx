import React, { useState, useCallback } from 'react';

import DataGrid, { Selection, RowDragging, Column } from 'devextreme-react/data-grid';

import { withLoadPanel } from '../../../utils/withLoadPanel';

import { Task } from '../../../types/task';

import '../card-tasks/CardTasks.scss';

const Grid = ({ tasks }: { tasks: Task[] }) => {
  const [gridData, setGridData] = useState(tasks);

  const onReorder = useCallback((e) => {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = gridData.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = gridData.indexOf(e.itemData);

    const newGridData = [...gridData];
    newGridData.splice(fromIndex, 1);
    newGridData.splice(toIndex, 0, e.itemData);
    setGridData(newGridData);
  }, [gridData]);

  return (
    <DataGrid
      className='tasks-grid'
      dataSource={gridData}
      columnAutoWidth
    >
      <Selection mode='multiple' showCheckBoxesMode='none' />

      <RowDragging
        // allowReordering
        onReorder={onReorder}
        showDragIcons
      />

      <Column
        dataField='text'
        caption='Procedure'
        hidingPriority={3}
      />
      <Column
        caption='Code'
        dataField='manager'
        hidingPriority={0}
      />
      <Column
        dataField='date'
        dataType='date'
        caption='Procedure Date'
        hidingPriority={1}
      />
    </DataGrid>
  );
};

const GridWithLoadPanel = withLoadPanel(Grid);

export const CardOpportunities = ({ tasks, isLoading }: { tasks?: Task[], isLoading: boolean }) => {
  return (
    <div className='card-tasks'>
      <GridWithLoadPanel
        tasks={tasks?.filter((item) => !!item.status && !!item.priority)}
        hasData={!!tasks}
        loading={isLoading}
        panelProps={{
          container: '.card-tasks',
          position: { of: '.card-tasks' }
        }}
      />
    </div>
  );
};
