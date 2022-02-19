/* --- ライブラリー、フレームワーク --------------------------------------------------------------------------------------- */
import React, { VFC } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./userEditPage.module.scss";

/* --- カスタムフック -------------------------------------------------------------------------------------------------- */
import { useUser } from "../../../../hooks/useUser";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { InputField } from "../../../../components/molecules/controls/InputField/InputField";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../../lib/$path";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { updateUser } from "../../../../apis/UsersApi";

/* --- バリデーション --------------------------------------------------------------------------------------------------- */
import { userNameErrorMessages, userValidations } from "../../../../config/validations/userValidations";


/* --- inputState ---------------------------------------------------------------------------------------------------- */
type UserInputValues = {
  name: string;
  email: string;
  description: string;
  avatarUri?: string | null;
}


const userEditPage: VFC = () => {

  const { user, userLoading, userError } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<UserInputValues>();
  const router = useRouter();

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
      console.log("更新しました");

    } catch (error: unknown) {

      console.log(error, "ユーザー更新に失敗しました。");
    }
  }

  return (
    <div className={styles.userEditPage}>
      <h1>ユーザー編集</h1>
      { userLoading && <p>ローディング中</p> }
      { userError && <p>エラー</p> }
      { user &&
      <form className={styles.userControlGroup} onSubmit={handleSubmit(update)}>
        <InputField
          className={styles.inputField}
          type="text"
          label="ユーザー名"
          placeholder="ユーザー名を入力してください"
          defaultValue={user.name}
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
          defaultValue={user.email}
          required={userValidations.email.required}
          inputProps={register("email", {
            required: userValidations.email.required,
            pattern: userValidations.email.regexp
          })}
        />
        { errors.email && userNameErrorMessages(errors.email) }

        <InputField
          className={styles.inputField}
          type="text"
          label="説明文"
          placeholder="説明文を入力してください"
          defaultValue={user.description}
          required={userValidations.description.required}
          inputProps={register("description", {
            required: userValidations.description.required,
            minLength: userValidations.description.minLength,
            maxLength: userValidations.description.maxLength
          })}
        />

        { errors.description && userNameErrorMessages(errors.description) }
        <button type="submit">更新する</button>
      </form>
      }
    </div>
  )
}

export default userEditPage;
