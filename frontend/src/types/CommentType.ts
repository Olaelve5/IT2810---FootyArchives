type User = {
  id: string;
  username: string;
};

export type CommentType = {
  id?: string;
  user: User;
  comment: string;
  date: string;
  result_id: string;
};
