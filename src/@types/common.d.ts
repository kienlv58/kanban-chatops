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
  label?: string;
}

interface ListItem {
  id: number;
  boardId: number;
  title: string;
  position: number;
  cards: CardItem[];
}
