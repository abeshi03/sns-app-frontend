/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./PostCard.module.scss";
import noImage from "../../../../../public/images/user-profile.png"

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../../type/Post";

type Props = {
  targetPostData: Post
}

const formattedPostedDate = (postedDate: string) => {
  const formattedDate = new Date(postedDate);
  return `${formattedDate.getMonth() + 1}月` +
  `${formattedDate.getDate()}日` +
  `${formattedDate.getHours()}時` +
  `${formattedDate.getMinutes()}分`;
}

/* eslint-disable-next-line react/display-name */
export const PostCard: VFC<Props> = memo((props) => {
  const { targetPostData } = props;
  return (
    <div className={styles.postCard}>
      <div className={styles.imageBlock}>
        <div
          className={styles.userAvatar}
          role="img"
          style={{backgroundImage: `url(${targetPostData.postedUserData.avatarUri ?? noImage.src})`}}
        >
        </div>
      </div>

      <div className={styles.contentBlock}>
        <div className={styles.nameAndPostedDate}>
          <p className={styles.userName}>{ targetPostData.postedUserData.name }</p>
          <p className={styles.postedDate}>{ formattedPostedDate(targetPostData.postedDateTime) }</p>
        </div>
        <p className={styles.postContent}>{ targetPostData.content }</p>
      </div>

    </div>
  );
});
