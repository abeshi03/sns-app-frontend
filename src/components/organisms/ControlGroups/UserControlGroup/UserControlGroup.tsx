/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";
import { UnpackNestedValue, useForm } from "react-hook-form";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./UserControlGroup.module.scss";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { InputField } from "../../../molecules/controls/InputField/InputField";

/* --- バリデーション -------------------------------------------------------------------------------------------------- */
import {
  emailErrorMessage, userDescriptionErrorMessage,
  userNameErrorMessages,
  userValidations
} from "../../../../config/validations/userValidations";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { User, UserInputValues } from "../../../../type/User";


type Props = {
  user: User;
  updateFunction: (inputValue: UnpackNestedValue<UserInputValues>) => Promise<void>;
}


/* eslint-disable-next-line react/display-name */
export const UserControlGroup: VFC<Props> = memo((props) => {

  const { user, updateFunction } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<UserInputValues>();

  return (
    <form className={styles.userControlGroup} onSubmit={handleSubmit(updateFunction)}>
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
      { errors.email && emailErrorMessage(errors.email) }

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

      { errors.description && userDescriptionErrorMessage(errors.description) }
      <button type="submit">更新する</button>
    </form>
  );
});
