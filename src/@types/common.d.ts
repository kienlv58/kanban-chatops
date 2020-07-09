interface PropsTest {
  name: string;
}

interface CardItem {
  id: number;
  listId: number;
  title: string;
  position: number;
  description?: string;
  assigned?: string;
  dueDate?: string;
  labelId?: number;
}

// interface ColumnKanBan {
//   id: number;
//   boardId: number;
//   title: string;
//   position: number;
//   cards: CardItem[];
// }

interface LabelItem {
  id: number;
  name: string;
  color: string;
}
