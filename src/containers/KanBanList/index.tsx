import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import AppLayout from '../../components/AppLayout';
import List from './List';

const KanBanList = () => {
  const params = useParams<{ boardId?: string }>();
  const [tabs, setTabs] = useState<ListItem[]>([
    {
      title: 'todo',
      task: [
        {
          id: 0,
          title: 'item 0',
          description: 'adsadadsa',
          label: 'red',
        },
        {
          id: 1,
          title: 'item 1',
          description: 'adsafsdfdsfdsdadsa',
          label: 'red',
        },
      ],
    },
    {
      title: 'doing',
      task: [{ id: 3, title: 'item 3', description: 'adsafsdfdsfdsdadsa', label: 'red' }],
    },
    { title: 'done', task: [] },
  ]);
  const handleDragEnd = (result: DropResult) => {
    console.log('result', result);
    const { destination, source, draggableId } = result;
    if (destination && destination?.droppableId !== source.droppableId) {
      const listSourceIndex = tabs.findIndex(item => {
        return item.title === source.droppableId;
      });
      const listDestIndex = tabs.findIndex(item => {
        return item.title === destination?.droppableId;
      });

      if (listDestIndex === -1 || listSourceIndex === -1) return;
      const dragItem = tabs[listSourceIndex].task.find(item => item.id.toString() === draggableId.toString());
      if (!dragItem) return;
      const [removeItem] = tabs[listSourceIndex].task.splice(source.index, 1);
      tabs[listDestIndex].task.splice(destination?.index, 0, removeItem);
      setTabs([...tabs]);
    }
  };

  return (
    <AppLayout>
      <div className={'board-name'}>Board {params.boardId}</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
          {tabs.map(col => (
            <List col={col} key={col.title} />
          ))}
        </Row>
      </DragDropContext>
    </AppLayout>
  );
};
export default KanBanList;
