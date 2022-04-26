/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./postDetailsPage.module.scss";
import noImage from "../../../../public/images/user-profile.png";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Comment } from "../../../type/Comment";

type Props = {
  comment: Comment;
}

export const CommentCard: VFC<Props> = memo((props) => {

  const { comment } = props;

  return (
    <div className={styles.commentCard}>

      <div className={styles.commentUserInfo}>
        <div
          className={styles.commentUserImage}
          role="img"
          style={{backgroundImage: `url(${comment.commentedUserData.avatarUri ?? noImage.src})`}}
        >
        </div>
        <p className={styles.commentUserName}>{comment.commentedUserData.name}</p>
      </div>

      <pre className={styles.comment}>{comment.text}</pre>

    </div>
  )
});
