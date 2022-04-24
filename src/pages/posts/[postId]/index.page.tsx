/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./postDetailsPage.module.scss"

/* --- api関連 ------------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../../../constants/endpoints";
import { getPostFetcher } from "../../../apis/PostsApi";
import { getCommentsFetcher } from "../../../apis/PostCommentApi";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../type/Post";
import { CommentsResponse } from "../../../type/response/CommentsResponse";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { PostCard } from "../../../components/organisms/Card/PostCard/PostCard";
import { CommentCard } from "./CommentCard";


const PostDetailsPage: NextPage = () => {

  const router = useRouter();
  const { postId } = router.query;

  /* --- 投稿取得 ----------------------------------------------------------------------------------------------------- */
  /* router.queryは初回レンダリングがundefinedのため考慮 */
  const { data: post, error: PostError } = useSWR<Post>(postId ? Endpoint.getPost({ postId: Number(postId) }) : null, getPostFetcher);
  const isPostLoading = !post && !PostError;
  const isPostError = PostError;

  /* --- コメント一覧取得 ----------------------------------------------------------------------------------------------- */
  const [ pageNumber, setPageNumber ] = useState(1);
  const LIMIT: number = 15;
  const { data, error: commentError } =
    useSWR<CommentsResponse>(postId ? Endpoint.getComments({
      pageNumber,
      limit: LIMIT,
      postId: Number(postId)
    }) : null, getCommentsFetcher);
  const isCommentLoading = !data && !commentError;
  const isCommentError = commentError;

  /* --- view -------------------------------------------------------------------------------------------------------- */
  return (
    <div className={styles.postDetailsPage}>
      {isPostLoading && <p>Loading...</p>}
      {isPostError && <p>投稿の取得に失敗しました　</p>}
      {post &&
        <>
          <PostCard targetPostData={post}/>
          <div className={styles.commentBlock}>
            {isCommentLoading && <p>Loading...</p>}
            {isCommentError && <p>コメントの取得に失敗しました</p>}
            {data &&
              <div className={styles.commentCardsFlow}>
                {data.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment}/>
                ))}
              </div>
            }
          </div>

        </>
      }
    </div>
  );
}

export default PostDetailsPage;
