/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";
import { useRouter } from "next/router";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./PostCard.module.scss";
import noImage from "../../../../../public/images/user-profile.png"

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../../lib/$path";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../../type/Post";

type Props = {
  className?: string;
  targetPostData: Post;
  isClick?: boolean;
  addLike: () => Promise<void>;
  removeLike: () => Promise<void>;
}

const formattedPostedDate = (postedDate: string) => {
  const formattedDate = new Date(postedDate);
  return `${formattedDate.getMonth() + 1}月` +
  `${formattedDate.getDate()}日` +
  `${formattedDate.getHours()}時` +
  `${formattedDate.getMinutes()}分`;
}



export const PostCard: VFC<Props> = memo((props) => {

  const { targetPostData, className, isClick = false, addLike, removeLike } = props;
  const router = useRouter();

  const goToPostDetailsPage = async () => {
    if (!isClick) return;
    await router.push(pagesPath.posts._postId(targetPostData.id).$url());
  }

  return (
    <div
      className={`${styles.postCard} ${className}`}
      onClick={goToPostDetailsPage }
      style={{ cursor: isClick ? "pointer" : "" }}
    >
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
        {targetPostData.like.isPostToLikeByCurrentUser ? (
          <p onClick={removeLike} className={styles.likesCount}>いいね！❤️{ targetPostData.like.totalCount }</p>
        ) : (
          <p onClick={addLike} className={styles.likesCount}>いいね！♡{ targetPostData.like.totalCount }</p>
        )}
      </div>
    </div>
  );
});
