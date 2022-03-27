/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "../../type/User";

export type CurrentUser = {
  currentUser: User | null;
}

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage
});

const initialState: CurrentUser = {
  currentUser: null
};


export const currentUserState: RecoilState<CurrentUser> = atom({
  key: "currentUserState",
  default: initialState,
  effects_UNSTABLE: [persistAtom]
});
