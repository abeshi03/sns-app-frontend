/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { User } from "../User";

export type UsersResponseType = {
  totalItemsCount: number;
  itemsCountInSelection: number;
  users: User[];
}
