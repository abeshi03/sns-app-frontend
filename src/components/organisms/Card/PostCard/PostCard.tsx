/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./PostCard.module.scss";
import noImage from "../../../../../public/images/user-profile.png"

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../../type/Post";

type Props = {
  className?: string;
  targetPostData: Post;
}

const formattedPostedDate = (postedDate: string) => {
  const formattedDate = new Date(postedDate);
  return `${formattedDate.getMonth() + 1}月` +
  `${formattedDate.getDate()}日` +
  `${formattedDate.getHours()}時` +
  `${formattedDate.getMinutes()}分`;
}



export const PostCard: VFC<Props> = memo((props) => {
  const { targetPostData, className } = props;
  return (
    <div className={`${styles.postCard} ${className}`}>
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
        { targetPostData.imageUri &&
          <div
            className={styles.postedImage}
            role="img"
            style={{backgroundImage: `url(${targetPostData.imageUri})`}}
          >
          </div>
        }
      </div>
    </div>
  );
});
