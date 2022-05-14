/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";
import { UnpackNestedValue, useForm, Controller } from "react-hook-form";
import Select from "react-select";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./UserControlGroup.module.scss";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { InputField } from "../../../molecules/controls/InputField/InputField";

/* --- バリデーション -------------------------------------------------------------------------------------------------- */
import {
  emailErrorMessage,
  userDescriptionErrorMessage,
  userNameErrorMessages,
  userRoleErrorMessage,
  userValidations
} from "../../../../config/validations/userValidations";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { User, USER_ROLE, UserInputValues, UserRole } from "../../../../type/User";
import { SelectField } from "../../../../lib/ReactSelect";

/* --- 補助関数 -------------------------------------------------------------------------------------------------------- */
import { formatterStrings } from "../../../../config/formatterStrings";


/* 更新の時だけユーザー情報がいる */
type Props = {
  existingUserInfo?: User;
  submitButtonName: string;
  submitFunction: (inputValue: UnpackNestedValue<UserInputValues>) => Promise<void>;
}


export const UserControlGroup: VFC<Props> = memo((props) => {

  const { existingUserInfo, submitFunction, submitButtonName } = props;

  const defaultValues = {
    name: existingUserInfo?.name,
    email: existingUserInfo?.email,
    description: existingUserInfo?.description,
    role: existingUserInfo?.role,
  }

  const { register, handleSubmit, control, formState: { errors } } = useForm<UserInputValues>({ defaultValues });

  /* --- セレクトフィールド --------------------------------------------------------------------------------------------- */
  const roleOptions: SelectField.Option<UserRole>[] =
    Object.values(USER_ROLE).map((value) => ({
      label: formatterStrings.userRole(value),
      value
    }));

  const getSelectDefaultValue = (): SelectField.Option<UserRole> | null => {
    if (existingUserInfo) {
      return {
        label: formatterStrings.userRole(existingUserInfo.role),
        value: existingUserInfo.role
      }
    }
    return null;
  }

  return (
    <form className={styles.userControlGroup} onSubmit={handleSubmit(submitFunction)}>
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

      <Controller
        control={control}
        name="role"
        rules={{ required: userValidations.role.required }}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Select
            placeholder="権限を選択"
            defaultValue={getSelectDefaultValue()}
            options={roleOptions}
            onBlur={onBlur}
            ref={ref}
            onChange={(newSelect) => onChange(newSelect?.value)}
          />
        )}
      />
      { errors.role && userRoleErrorMessage(errors.role) }

      <button type="submit">{ submitButtonName }</button>
    </form>
  );
});
