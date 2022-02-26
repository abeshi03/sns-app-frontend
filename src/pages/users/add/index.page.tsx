/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { VFC } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

/* --- グローバルstate ------------------------------------------------------------------------------------------------- */
import { floatingNotificationBarState } from "../../../store/floatingNotificationBar/floatingNotificationBarState";

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



const UserAddPage: VFC = () => {


  const router = useRouter();
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);


  const add: SubmitHandler<UserInputValues> = async (inputValue): Promise<void> => {

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
  }


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
