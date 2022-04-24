/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import useSWR from "swr";
import { useRecoilValue } from "recoil";

/* --- globalState --------------------------------------------------------------------------------------------------- */
import { currentUserState } from "../../../store/auth/authState";

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
import { Pagination } from "../../../components/molecules/Pagination/Pagination";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { isNotNull } from "../../../utility/typeGuard/isNotNull";


const PostDetailsPage: NextPage = () => {

  const currentUser = useRecoilValue(currentUserState).currentUser;
  const isLogin: boolean = isNotNull(currentUser);
  const router = useRouter();
  const { postId } = router.query;

  /* --- 投稿取得 ----------------------------------------------------------------------------------------------------- */
  /* router.queryは初回レンダリングがundefinedのため考慮 */
  const { data: post, error: PostError } = useSWR<Post>(postId ? Endpoint.getPost({ postId: Number(postId) }) : null, getPostFetcher);
  const isPostLoading = !post && !PostError;
  const isPostError = PostError;

  /* --- コメント一覧取得 ----------------------------------------------------------------------------------------------- */
  const [ pageNumber, setPageNumber ] = useState(1);
  const LIMIT: number = 7;

  const { data, error: commentError } =
    useSWR<CommentsResponse>(postId ? Endpoint.getComments({
      pageNumber,
      limit: LIMIT,
      postId: Number(postId)
    }) : null, getCommentsFetcher);

  const isCommentLoading = !data && !commentError;
  const isCommentError = commentError;
  const isNoComments = data && data.totalItemsCount === 0

  const paginationScrollPoint = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const onChangePageComment = useCallback((pageNumber: number): void => {
    setPageNumber(pageNumber);
    paginationScrollPoint.current.scrollIntoView();
  }, []);

  /* --- view -------------------------------------------------------------------------------------------------------- */
  return (
    <div className={styles.postDetailsPage}>
      {isPostLoading && <p>Loading...</p>}
      {isPostError && <p>投稿の取得に失敗しました　</p>}
      {post &&
        <>
          <PostCard targetPostData={post}/>
          <div className={styles.commentBlock} ref={paginationScrollPoint}>
            <h2 className={styles.heading}>コメント</h2>
            {isLogin && <p className={styles.addCommentLink}>コメントを投稿する</p>}
            {isCommentLoading && <p>Loading...</p>}
            {isCommentError && <p>コメントの取得に失敗しました</p>}
            {isNoComments && <p>コメントは現在投稿されておりません</p>}
            {data &&
              <>
                <div className={styles.commentCardsFlow}>
                  {data.comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment}/>
                  ))}
                </div>
                <Pagination
                  className={styles.pagination}
                  totalCount={data.totalItemsCount}
                  currentPageNumber={pageNumber}
                  perPageNumber={LIMIT}
                  onChangePage={onChangePageComment}
                />
              </>
            }
          </div>

        </>
      }
    </div>
  );
}

export default PostDetailsPage;

