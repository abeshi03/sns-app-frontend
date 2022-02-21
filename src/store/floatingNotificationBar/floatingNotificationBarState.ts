/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import { atom, RecoilState } from "recoil";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { AlertType } from "../../type/AlertType";

export type FloatingNotificationBar = {
  notification?: {
    message: string;
    type: AlertType;
  }
}

const initialState: FloatingNotificationBar = {
  notification: undefined
}

export const floatingNotificationBarState: RecoilState<FloatingNotificationBar> = atom({
  key: "floatingNotificationBarState",
  default: initialState
});
