/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pagesPath } from "../../lib/$path";

/* --- グローバルstate ------------------------------------------------------------------------------------------------- */
import { currentUserState } from "../../store/auth/authState";
import { floatingNotificationBarState } from "../../store/floatingNotificationBar/floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./SignIn.module.scss";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { InputField } from "../../components/molecules/controls/InputField/InputField";
import { Button } from "../../components/atoms/Button/Button";

/* --- バリデーション -------------------------------------------------------------------------------------------------- */
import { emailErrorMessage, userValidations, userPasswordErrorMessage } from "../../config/validations/userValidations";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { AuthApi } from "../../apis/AuthApis";

/* --- 補助関数 -------------------------------------------------------------------------------------------------------- */
import { isNotNull } from "../../utility/typeGuard/isNotNull";


export type SignInInputValues = {
  email: string;
  password: string;
};

const SignInPage: NextPage = () => {

  const currentUser = useRecoilValue(currentUserState).currentUser;
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInInputValues>();

  const signIn: SubmitHandler<SignInInputValues> = async (inputValue): Promise<void> => {

    try {

      const userResponse = await AuthApi.signIn({
        email: inputValue.email,
        password: inputValue.password
      });

      setCurrentUser({
        currentUser: userResponse
      });

      if (router.query.nextPagePath) {
        await router.push(decodeURIComponent(router.query.nextPagePath as string));
      } else {
        await router.push(pagesPath.$url());
      }

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
      });
    }
  }


  useEffect(() => {
    if (isNotNull(currentUser)) {
      router.replace(pagesPath.$url()).then(() => {
        setFloatingNotificationBar({
          notification: {
            type: "WARNING",
            message: "すでにログインしています"
          }
        })
      });
    }
  }, []);

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
