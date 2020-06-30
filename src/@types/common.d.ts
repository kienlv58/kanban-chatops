interface PropsTest {
  name: string;
}

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
