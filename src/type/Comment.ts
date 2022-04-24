import { User } from "./User";

export type Comment = {
  id: number;
  text: string;
  commentedUserData: Pick<User, "id" | "name" | "avatarUri">;
  commentedDateTime: string;
}

export type CommentInputValue = {
  text: string;
}
