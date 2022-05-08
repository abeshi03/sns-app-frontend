/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import useSWR from "swr";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SubmitHandler } from "react-hook-form";

/* --- globalState --------------------------------------------------------------------------------------------------- */
import { currentUserState } from "../../../store/auth/authState";
import { floatingNotificationBarState } from "../../../store/floatingNotificationBar/floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./postDetailsPage.module.scss"

/* --- api関連 ------------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../../../constants/endpoints";
import { getPostFetcher } from "../../../apis/PostsApi";
import { createPostComment, getCommentsFetcher } from "../../../apis/PostCommentApi";
import { LikeApi } from "../../../apis/PostLikeApi";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../type/Post";
import { CommentsResponse } from "../../../type/response/CommentsResponse";
import { Comment, CommentInputValue } from "../../../type/Comment";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { PostCard } from "../../../components/organisms/Card/PostCard/PostCard";
import { CreateCommentModal } from "./CreateCommentModal";
import { CommentCard } from "./CommentCard";
import { Pagination } from "../../../components/molecules/Pagination/Pagination";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { isNotNull } from "../../../utility/typeGuard/isNotNull";


const PostDetailsPage: NextPage = () => {

  const currentUser = useRecoilValue(currentUserState).currentUser;
  const setFloatingNotificationBarState = useSetRecoilState(floatingNotificationBarState);
  const isLogin: boolean = isNotNull(currentUser);
  const router = useRouter();
  const { postId } = router.query;

  /* --- 投稿取得 ----------------------------------------------------------------------------------------------------- */
  /* router.queryは初回レンダリングがundefinedのため考慮 */
  const { data: post, error: PostError, mutate: postMutate } =
    useSWR<Post>(postId ? Endpoint.getPost({ postId: Number(postId) }) : null, getPostFetcher);
  const isPostLoading = !post && !PostError;
  const isPostError = PostError;

  /* --- コメント一覧取得 ----------------------------------------------------------------------------------------------- */
  const [ pageNumber, setPageNumber ] = useState(1);
  const LIMIT: number = 7;

  const url = postId ? Endpoint.getComments({
      pageNumber,
      limit: LIMIT,
      postId: Number(postId)
    }) : null;

  const { data, error: commentError, mutate: commentMutate } = useSWR<CommentsResponse>(url, getCommentsFetcher);

  const isCommentLoading = !data && !commentError;
  const isCommentError = commentError;
  const isNoComments = data && data.totalItemsCount === 0

  const paginationScrollPoint = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const onChangePageComment = useCallback((pageNumber: number): void => {
    setPageNumber(pageNumber);
    paginationScrollPoint.current.scrollIntoView();
  }, [ pageNumber ]);

  /* --- コメント追加関連 ----------------------------------------------------------------------------------------------- */
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const onCLickOpenModal = () => {
    setIsModalOpen(true);
  }

  const createComment: SubmitHandler<CommentInputValue> = useCallback(async (inputValue): Promise<void> => {

    /* ログインしていない場合、そもそも投稿まで辿りつけないのでエラーを返すべき */
    if (!currentUser) {
      throw new Error("ログインしていない場合投稿できません")
    }

    let newCommentId!: number;

    try {
      newCommentId = await createPostComment({
        id: post!.id,
        text: inputValue.text
      });
      setFloatingNotificationBarState({
        notification: {
          type: "SUCCESS",
          message: "コメントを投稿しました"
        }
      });
      setIsModalOpen(false);

    } catch (error: unknown) {
      console.error(error);
      setFloatingNotificationBarState({
        notification: {
          type: "ERROR",
          message: "コメントの投稿に失敗しました。"
        }
      });

      return;
    }

    if (pageNumber !== 1) {
      setPageNumber(1);
    }

    if (!data) {
      throw new Error("dataがなければ基本的にここまで辿りつけないはず")
    }

    const newCommentData: Comment = {
      id: newCommentId,
      text: inputValue.text,
      commentedUserData: {
        id: currentUser.id,
        name: currentUser.name,
        avatarUri: currentUser.avatarUri
      },
      commentedDateTime: new Date().toISOString()
    };

    await commentMutate({
      comments: [ newCommentData, ...data.comments ],
      totalItemsCount: data.totalItemsCount + 1
    }, false);

  }, [ currentUser, data, pageNumber ]);


  /* --- イイネ関連 ---------------------------------------------------------------------------------------------------- */
  const addLike = useCallback(async (): Promise<void> => {

    if (!isLogin) {
      setFloatingNotificationBarState({
        notification: {
          type: "INFO",
          message: "いいねをするにはログインが必要です"
        }
      });
      return;
    }

    if (!post) return console.log("投稿が取得できていなければいいねができないべき");

    try {
      await LikeApi.add(post.id);
      await postMutate({
        ...post,
        like: {
          isPostToLikeByCurrentUser: true,
          totalCount: post.like.totalCount + 1
        }
      }, false);
    } catch (error: unknown) {
      console.log(error);
      setFloatingNotificationBarState({
        notification: {
          type: "ERROR",
          message: "いいねに失敗しました"
        }
      });
    }
  }, [ post, isLogin ])

  const removeLike = useCallback(async (): Promise<void> => {

    if (!isLogin) {
      setFloatingNotificationBarState({
        notification: {
          type: "INFO",
          message: "いいね削除をするにはログインが必要です"
        }
      });
      return;
    }

    if (!post) return console.log("投稿が取得できていなければいいね削除ができないべき");

    try {
      await LikeApi.remove(post.id);
      await postMutate({
        ...post,
        like: {
          isPostToLikeByCurrentUser: false,
          totalCount: post.like.totalCount - 1
        }
      }, false);
    } catch (error: unknown) {
      console.log(error);
      setFloatingNotificationBarState({
        notification: {
          type: "ERROR",
          message: "いいね削除に失敗しました"
        }
      });
    }
  }, [ post, isLogin ])

  /* --- view -------------------------------------------------------------------------------------------------------- */
  return (
    <div className={styles.postDetailsPage}>
      {/* 投稿部分 =================================================================================================== */}
      {isPostLoading && <p>Loading...</p>}
      {isPostError && <p>投稿の取得に失敗しました　</p>}
      {post &&
        <>
          <PostCard targetPostData={post} addLike={addLike} removeLike={removeLike}/>
          {/* コメント部分 ============================================================================================ */}
          <div className={styles.commentBlock} ref={paginationScrollPoint}>
            <h2 className={styles.heading}>コメント</h2>
            {isLogin && post && data && <p className={styles.addCommentLink} onClick={onCLickOpenModal}>コメントを投稿する</p>}
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
      {/* モーダル処理 ================================================================================================ */}
      <CreateCommentModal
        isModalOpen={isModalOpen}
        closeModalFunction={closeModal}
        submitFunction={createComment}
      />
    </div>
  );
}

export default PostDetailsPage;
