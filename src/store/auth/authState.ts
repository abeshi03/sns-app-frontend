/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "../../type/User";
import { isNotNull } from "../../utility/typeGuard/isNotNull";

export type CurrentUser = {
  currentUser: User | null;
}


/* --- ステート永続化 --------------------------------------------------------------------------------------------------- */
const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : localStorage
});

/* --- 認証されたユーザー ------------------------------------------------------------------------------------------------ */
const initialState: CurrentUser = {
  currentUser: null
};

export const currentUserState: RecoilState<CurrentUser> = atom({
  key: "currentUserState",
  default: initialState,
  effects_UNSTABLE: [persistAtom]
});

/* --- ログイン判定 ---------------------------------------------------------------------------------------------------- */
const isLogin: boolean = isNotNull(initialState.currentUser);

export const isLoginState: RecoilState<boolean> = atom({
  key: "isLoginState",
  default: isLogin,
  effects_UNSTABLE: [persistAtom]
})
