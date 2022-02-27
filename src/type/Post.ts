import { User } from "./User";

export type Post = {
  id: number;
  content: string;
  imageUri?: string;
  postedUserData: User;
  postedDateTime: string;
}
