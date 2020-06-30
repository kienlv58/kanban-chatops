import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Task {
  id: number;
  title: string;
  label: string;
  description: string;
}

interface ListItem {
  title: string;
  task: Task[];
}

const About = () => {
  const [tabs] = useState<ListItem[]>([
    {
      title: 'todo',
      task: [
        {
          id: 0,
          title: 'add abc',
          description: 'adsadadsa',
          label: 'red',
        },
      ],
    },
    {
      title: 'doing',
      task: [],
    },
    { title: 'done', task: [] },
  ]);
  const handleDragEnd = () => {
    //TODO
  };
  return (
    <div>
      this is About page
      <DragDropContext onDragEnd={handleDragEnd}>
        {tabs.map(col => (
          <Droppable droppableId={col.title}>
            {provided => {
              console.log('provided', provided);
              return (
                <div ref={provided.innerRef} style={{ minHeight: 300, background: 'red' }} key={col.title}>
                  <label>{col.title}</label>
                  {col.task.map((task, index) => (
                    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                      {dragProvided => {
                        console.log('dragProvided', dragProvided);
                        return (
                          <div
                            ref={provided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}>
                            {task.title}
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};
export default About;
