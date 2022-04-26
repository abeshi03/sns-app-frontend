/* --- ライブラリー --------------------------------------------------------------------------------------------------- */
import { FieldError } from "react-hook-form";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { ErrorMessage } from "../../components/atoms/ErrorMessage/ErrorMessage";

export const commentValidations = {
  text: {
    required: true,
    minLength: 2,
    maxLength: 280
  }
};

export const textErrorMessages = (error: FieldError) => {

  switch (error.type) {

    case "required": return <ErrorMessage message="コメントが入力されておりません"/>;

    case "minLength": return <ErrorMessage
      message={`コメントは${commentValidations.text.minLength}~${commentValidations.text.maxLength}文字で入力してください`}
    />;

    case "maxLength": return <ErrorMessage
      message={`コメントは${commentValidations.text.minLength}~${commentValidations.text.maxLength}文字で入力してください`}
    />;
  }
}
