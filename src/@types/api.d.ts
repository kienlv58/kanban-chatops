interface UserGithub {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email?: string;
  hireable?: string;
  bio: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}
interface ErrorResponseType {
  data: {
    message: string;
    status: number;
  };
  message: string;
  status: number;
}

interface Board {
  id: number;
  title: string;
  description: string;
  created_by: string;
  updated_by?: string;
  deleted_by?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

interface ColumnKanBan {
  id: number;
  board_id: number;
  title: string;
  position: number;
  created_by: string;
  updated_by?: string;
  deleted_by?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  cards: CardItem[];
}

interface Links {
  first: string;
  last: string;
  prev?: string;
  next?: string;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface ListResponse<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

interface DataModal {
  visible: boolean;
  board?: Board;
}

interface PostBoardData {
  title: string;
  description: string;
  created_by: string;
}

interface PostNewColumnKanBan {
  board_id: number;
  title: string;
  created_by: string;
}
