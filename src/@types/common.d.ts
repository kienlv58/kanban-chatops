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
  board_id: number;
  color: string;
  name: string;
  created_by: string;
  updated_by?: string;
  deleted_by?: string;
  deleted_at?: string;
  created_at: string;
  updated_at?: string;
}
