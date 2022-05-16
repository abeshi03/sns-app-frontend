/* --- ライブラリー --------------------------------------------------------------------------------------------------- */
import { FieldError } from "react-hook-form";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { ErrorMessage } from "../../components/atoms/ErrorMessage/ErrorMessage";

export const userValidations = {

  name: {
    required: true,
    minLength: 1,
    maxLength: 30
  },

  email: {
    required: true,
    regexp: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  },

  description: {
    required: true,
    minLength: 1,
    maxLength: 200
  },

  password: {
    required: true,
    minLength: 4,
    maxLength: 255
  },

  role: {
    required: true
  }

  // avatarImage: {
  //   required: false,
  //   accept: ".png, .jpeg",
  //   supportedImagesFileExtensions: [ "png", "jpeg", "jpg" ], // アップロードのバリデーションの為にacceptと両方必要
  //   maximalImagesCount: 1
  // }
};

export const userNameErrorMessages = (error: FieldError) => {
  switch (error.type) {

    case "required": return <ErrorMessage message="ユーザー名は必須です"/>;

    case "minLength": return <ErrorMessage
      message={`ユーザー名は${userValidations.name.minLength}~${userValidations.name.maxLength}文字で入力してください`}
    />;

    case "maxLength": return <ErrorMessage
      message={`ユーザー名は${userValidations.name.minLength}~${userValidations.name.maxLength}文字で入力してください`}
    />;
  }
};

export const emailErrorMessage = (error: FieldError) => {
  switch (error.type) {
    case "required": return <ErrorMessage message={"名前は必須です"}/>;
    case "pattern": return <ErrorMessage message="不正なメールアドレスです。(正しい例: example@example.com)"/>;
  }
}

export const userDescriptionErrorMessage = (error: FieldError) => {
  switch (error.type) {
    case "required": return <ErrorMessage message={"説明文は必須です"}/>;

    case "minLength": return <ErrorMessage
      message={`説明文は最小${userValidations.description.minLength}文字 ~ ${userValidations.description.maxLength}文字で入力してください`}
    />

    case "maxLength": return <ErrorMessage
      message={`説明文は最小${userValidations.description.minLength}文字 ~ ${userValidations.description.maxLength}文字で入力してください`}
    />
  }
}

export const userRoleErrorMessage = (error: FieldError) => {
  switch (error.type) {
    case "required": return <ErrorMessage message={"権限は必須です"}/>;
  }
}

export const userPasswordErrorMessage = (error: FieldError) => {
  switch (error.type) {
    case "required": return <ErrorMessage message={"パスワードは必須です"}/>;

    case "minLength": return <ErrorMessage
      message={`パスワードは最小${userValidations.password.minLength}文字 ~ ${userValidations.password.maxLength}文字で入力してください`}
    />

    case "maxLength": return <ErrorMessage
      message={`パスワードは最小${userValidations.password.minLength}文字 ~ ${userValidations.password.maxLength}文字で入力してください`}
    />
  }
}
