/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Comment } from "../Comment";

export type CommentsResponse = {
  comments: Comment[];
  totalItemsCount: number;
}
