/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./UserCard.module.scss";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { User } from "../../../../type/User";


type Props = {
  targetUser: User;
  className?: string;
}


/* eslint-disable-next-line react/display-name */
export const UserCard: VFC<Props> = memo((props) => {

  const { targetUser, className } = props;

  return (
    <div className={`${styles.userCard} ${className}`}>

      <div className={styles.gridContainer}>
        <div
          className={styles.userImage}
          role="img"
          style={{backgroundImage: `url(${targetUser.avatarUri ?? ""})`}}
        ></div>
        <div className={styles.userName}>{ targetUser.name }</div>
      </div>

      <div className={styles.email}>{ targetUser.email }</div>

      <div className={styles.description}>{ targetUser.description}</div>

    </div>
  );
});
