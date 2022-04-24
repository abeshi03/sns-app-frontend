/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import { memo, VFC } from "react";
import { UnpackNestedValue, useForm } from "react-hook-form";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./postDetailsPage.module.scss";

/* --- バリデーション -------------------------------------------------------------------------------------------------- */
import { commentValidations, textErrorMessages } from "../../../config/validations/commentValidations";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { Modal } from "../../../components/molecules/Modal/Modal";
import { InputField } from "../../../components/molecules/controls/InputField/InputField";
import { Button } from "../../../components/atoms/Button/Button";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { CommentInputValue } from "../../../type/Comment";


type Props = {
  isModalOpen: boolean;
  closeModalFunction: () => void;
  submitFunction: (inputValue: UnpackNestedValue<CommentInputValue>) => Promise<void>;
}

export const CreateCommentModal: VFC<Props> = memo((props) => {

  const { isModalOpen, closeModalFunction, submitFunction } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<CommentInputValue>();

  return (
    <Modal isOpen={isModalOpen} closeModalFunction={closeModalFunction}>
      <form className={styles.createCommentForm} onSubmit={handleSubmit(submitFunction)}>
        <div className={styles.inputContainer}>
          <InputField
            type="text"
            required={commentValidations.text.required}
            label="コメント"
            placeholder="コメントを入力してください"
            inputProps={register("text", {
              required: commentValidations.text.required,
              minLength: commentValidations.text.minLength,
              maxLength: commentValidations.text.maxLength
            })}
          />
          { errors.text && textErrorMessages(errors.text) }
        </div>
        <Button className={styles.submitButton} type="submit" color="SKY_BLUE" size="BIG" path="#">コメントを投稿</Button>
      </form>
    </Modal>
  );
});
