/* --- ライブラリー、フレームワーク --------------------------------------------------------------------------------------- */
import React, { VFC } from "react";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";

/* --- グローバルstate ------------------------------------------------------------------------------------------------- */
import { floatingNotificationBarState } from "../../../../store/floatingNotificationBar/floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./userEditPage.module.scss";

/* --- カスタムフック -------------------------------------------------------------------------------------------------- */
import { useUser } from "../../../../hooks/useUser";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { Button } from "../../../../components/atoms/Button/Button";
import { UserControlGroup } from "../../../../components/organisms/ControlGroups/UserControlGroup/UserControlGroup";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../../lib/$path";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UserInputValues } from "../../../../type/User";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { deleteUser, updateUser } from "../../../../apis/UsersApi";




const userEditPage: VFC = () => {

  const { user, userLoading, userError } = useUser();
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);
  const router = useRouter();


  const deleteUserData = async (): Promise<void> => {

    try {

      if (!user) return;

      if (confirm("本当に削除しますか？")) {

        await deleteUser(user.id);
        await router.replace(pagesPath.users.$url());

        setFloatingNotificationBar({
          notification: {
            type: "SUCCESS",
            message: "ユーザーを削除しました"
          }
        });

      } else {
        return;
      }


    } catch (error: unknown) {

      console.log(error, "ユーザーの削除に失敗しました");
      setFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "ユーザーの削除に失敗いたしました。"
        }
      });
    }
  }

  const update: SubmitHandler<UserInputValues> = async (inputValue): Promise<void> => {

    try {

      if (!user) {
        console.log("ユーザーいない、、、")
        return;
      }

      await updateUser({
        id: user.id,
        name: inputValue.name,
        email: inputValue.email,
        description: inputValue.description,
        avatarUri: null
      });

      await router.replace(pagesPath.users._userId(user.id).$url());

      setFloatingNotificationBar({
        notification: {
          type: "SUCCESS",
          message: "ユーザーを更新しました"
        }
      });

    } catch (error: unknown) {

      console.log(error, "ユーザー更新に失敗しました。");
      setFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "ユーザーの更新に失敗しました"
        }
      });
    }
  }

  return (
    <div className={styles.userEditPage}>
      <h1>ユーザー編集</h1>
      { userLoading && <p>ローディング中</p> }
      { userError && <p>エラー</p> }
      { user &&
        <UserControlGroup
          existingUserInfo={user}
          submitButtonName="ユーザーを更新する"
          submitFunction={update}
        />
      }
      <Button color="SKY_BLUE" size="BIG" path="#" onClick={deleteUserData}>
        ユーザーを削除する
      </Button>
    </div>
  )
}

export default userEditPage;

