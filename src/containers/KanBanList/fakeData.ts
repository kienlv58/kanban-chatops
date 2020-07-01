export const listKanBan: ListItem[] = [
  {
    id: 0,
    boardId: 1,
    title: 'Todo',
    position: 0,
    cards: [
      {
        id: 0,
        listId: 0,
        title: 'Test1',
        description: 'This is description',
        assigned: 'Kienlv',
        dueDate: '20/11/2010',
        label: 'todo',
        position: 0,
      },
    ],
  },
  {
    id: 1,
    boardId: 1,
    title: 'Doing',
    position: 1,
    cards: [
      {
        id: 1,
        listId: 1,
        title: 'Test2',
        description: 'This is description',
        assigned: 'Kienlv',
        dueDate: '20/11/2010',
        label: 'doing',
        position: 0,
      },
      {
        id: 2,
        listId: 1,
        title: 'Test3',
        description: 'This is description',
        assigned: 'Kienlv',
        dueDate: '20/11/2010',
        label: 'doing',
        position: 1,
      },
    ],
  },
];
