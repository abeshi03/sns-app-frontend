/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, {useCallback, useEffect, VFC} from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";

/* --- グローバルstate ------------------------------------------------------------------------------------------------- */
import { floatingNotificationBarState } from "../../../store/floatingNotificationBar/floatingNotificationBarState";
import { currentUserState } from "../../../store/auth/currentUserState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./UserAddPage.module.scss";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../lib/$path";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UserInputValues } from "../../../type/User";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { UserControlGroup } from "../../../components/organisms/ControlGroups/UserControlGroup/UserControlGroup";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { addUser } from "../../../apis/UsersApi";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { isNull } from "../../../utility/typeGuard/isNull";



const UserAddPage: VFC = () => {


  const router = useRouter();
  const currentUser = useRecoilValue(currentUserState).currentUser;
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);


  const add: SubmitHandler<UserInputValues> = useCallback(async (inputValue): Promise<void> => {

    try {

      const userId = await addUser({
        name: inputValue.name,
        email: inputValue.email,
        description: inputValue.description
      });

      await router.replace(pagesPath.users._userId(userId).$url());

      setFloatingNotificationBar({
        notification: {
          type: "SUCCESS",
          message: "ユーザーを追加しました"
        }
      });

    } catch (error: unknown) {

      console.log(error, "ユーザーの追加に失敗しました")
      setFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "ユーザーの更新に失敗しました"
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isNull(currentUser)) {
      router.push(pagesPath.sign_in.$url(), {
        pathname: pagesPath.users.add.$url().pathname
      }).then(() => {
        setFloatingNotificationBar({
          notification: {
            type: "WARNING",
            message: "ログインしてください"
          }
        })
      });
    }
  }, []);


  return (
    <div className={styles.userAddPage}>
      <h1>ユーザー追加</h1>
      <UserControlGroup
        submitButtonName="ユーザーを追加"
        submitFunction={add}
      />
    </div>
  )
}


export default UserAddPage;
