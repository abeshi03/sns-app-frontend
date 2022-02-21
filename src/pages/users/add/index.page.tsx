/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { InputField } from "../../../components/molecules/controls/InputField/InputField";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { addUser } from "../../../apis/UsersApi";

/* --- バリデーション -------------------------------------------------------------------------------------------------- */
import {
  userValidations,
  emailErrorMessage,
  userDescriptionErrorMessage,
  userNameErrorMessages
} from "../../../config/validations/userValidations";


const UserAddPage: VFC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<UserInputValues>();
  const router = useRouter();
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);


  const add: SubmitHandler<UserInputValues> = async (inputValue): Promise<void> => {

    try {

      const userId = await addUser({
        name: inputValue.name,
        email: inputValue.email,
        description: inputValue.description,
        avatarUri: null
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
      <form className={styles.userAddingForm} onSubmit={handleSubmit(add)}>
        <InputField
          className={styles.inputField}
          type="text"
          label="ユーザー名"
          placeholder="ユーザー名を入力してください"
          required={userValidations.name.required}
          inputProps={register("name", {
            required: userValidations.name.required,
            minLength: userValidations.name.minLength,
            maxLength: userValidations.name.maxLength
          })}
        />
        { errors.name && userNameErrorMessages(errors.name) }

        <InputField
          className={styles.inputField}
          type="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
          required={userValidations.email.required}
          inputProps={register("email", {
            required: userValidations.email.required,
            pattern: userValidations.email.regexp
          })}
        />
        { errors.email && emailErrorMessage(errors.email) }

        <InputField
          className={styles.inputField}
          type="text"
          label="説明文"
          placeholder="説明文を入力してください"
          required={userValidations.description.required}
          inputProps={register("description", {
            required: userValidations.description.required,
            minLength: userValidations.description.minLength,
            maxLength: userValidations.description.maxLength
          })}
        />

        { errors.description && userDescriptionErrorMessage(errors.description) }
        <button type="submit">ユーザー追加</button>
      </form>
    </div>
  )
}


export default UserAddPage;
