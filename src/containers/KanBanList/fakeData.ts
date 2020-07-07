export const listKanBan: ColumnKanBan[] = [
  {
    id: 0,
    boardId: 1,
    title: 'Todo',
    position: 0,
    cards: [
      {
        id: 10,
        listId: 0,
        title: 'Test1',
        description: 'This is description',
        assigned: 'Kienlv',
        dueDate: '20/11/2010',
        labelId: 1,
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
        id: 11,
        listId: 1,
        title: 'Test2',
        description: 'This is description',
        assigned: 'Kienlv',
        dueDate: '20/11/2010',
        labelId: 1,
        position: 0,
      },
      {
        id: 12,
        listId: 1,
        title: 'Test3',
        description: 'This is description',
        assigned: 'Kienlv',
        dueDate: '20/11/2010',
        labelId: 1,
        position: 1,
      },
    ],
  },
];

export const labels: LabelItem[] = [
  { id: 1, name: 'todo', color: '#f50' },
  { id: 2, name: 'doing', color: '#2db7f5' },
  { id: 3, name: 'done', color: '#87d068' },
];
