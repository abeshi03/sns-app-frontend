/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import { atom, RecoilState } from "recoil";
import { User } from "../../type/User";

export type CurrentUser = {
  currentUser: User | null;
}

const initialState: CurrentUser = {
  currentUser: null
};


export const currentUserState: RecoilState<CurrentUser> = atom({
  key: "currentUserState",
  default: initialState
});
