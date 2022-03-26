/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React from "react";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

/* --- グローバルstate ------------------------------------------------------------------------------------------------- */
import { currentUserState } from "../../store/auth/currentUserState";
import { floatingNotificationBarState } from "../../store/floatingNotificationBar/floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./SignIn.module.scss";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { InputField } from "../../components/molecules/controls/InputField/InputField";
import { Button } from "../../components/atoms/Button/Button";

/* --- バリデーション -------------------------------------------------------------------------------------------------- */
import { emailErrorMessage, userValidations, userPasswordErrorMessage } from "../../config/validations/userValidations";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { signInApi } from "../../apis/AuthApis";

export type SignInInputValues = {
  email: string;
  password: string;
};

const SignInPage: NextPage = () => {

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInInputValues>();

  const signIn: SubmitHandler<SignInInputValues> = async (inputValue): Promise<void> => {

    try {

      const userResponse = await signInApi({
        email: inputValue.email,
        password: inputValue.password
      });

      setCurrentUser({
        currentUser: userResponse
      });

      setFloatingNotificationBar({
        notification: {
          type: "SUCCESS",
          message: "ログインしました"
        }
      });

    } catch (error: unknown) {
      console.error(error);

      setFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "ログインに失敗しました"
        }
      })
    }
  }

  return (
    <div className={styles.signInPage}>
      <form className={styles.signInControlGroup} onSubmit={handleSubmit(signIn)}>

        <div className={styles.inputContainer}>
          <InputField
            type="email"
            required={userValidations.email.required}
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
            inputProps={register("email", {
              required: userValidations.email.required,
              pattern: userValidations.email.regexp
            })}
            autoComplete="email"
          />
          { errors.email && emailErrorMessage(errors.email) }
        </div>

        <div className={styles.inputContainer}>
          <InputField
            type="password"
            required={userValidations.password.required}
            label="パスワード"
            placeholder="パスワードを入力してください"
            inputProps={register("password", {
              required: userValidations.password.required,
              minLength: userValidations.password.minLength,
              maxLength: userValidations.password.maxLength
            })}
            autoComplete="password"
          />
          { errors.password && userPasswordErrorMessage(errors.password) }
        </div>

        <Button
          color="SKY_BLUE"
          size="BIG"
          path="#"
          type="submit"
        >ログイン</Button>
      </form>
    </div>
  )
};

export default SignInPage;
