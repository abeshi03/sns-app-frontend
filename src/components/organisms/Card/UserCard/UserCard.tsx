/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";
import Link from "next/link";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./UserCard.module.scss";
import noImage from "../../../../../public/images/user-profile.png";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../../lib/$path";

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
    <Link href={pagesPath.users._userId(targetUser.id).$url()}>
      <a className={`${styles.userCard} ${className}`}>

        <div className={styles.gridContainer}>
          <div
            className={styles.userImage}
            role="img"
            style={{backgroundImage: `url(${targetUser.avatarUri ?? noImage.src})`}}
          ></div>
          <div className={styles.userName}>{ targetUser.name }</div>
        </div>

        <div className={styles.email}>{ targetUser.email }</div>

        <div className={styles.description}>{ targetUser.description}</div>

      </a>
    </Link>
  );
});
