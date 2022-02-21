/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット -------------------------------------------------------------------------------------------------------- */
import styles from "./ErrorMessage.module.scss";


type Props = {
  message: string;
}

export const ErrorMessage: VFC<Props> = memo((props) => {

  const { message } = props;

  return (
    <span className={styles.errorMessage}>{ message }</span>
  );
});
