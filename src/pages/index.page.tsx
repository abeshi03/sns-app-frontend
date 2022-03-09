/* --- ライブラリー --------------------------------------------------------------------------------------------------- */
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

/* --- アセット ------------------------------------------------------------------------------------------------------ */
import styles from "./Home.module.scss";

/* --- エンドポイント ------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";

/* --- 型定義 -------------------------------------------------------------------------------------------------------- */
import { Post } from "../type/Post";

/* --- フェッチャー ---------------------------------------------------------------------------------------------------- */
import { getPostsFetcher } from "../apis/PostsApi";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { PostCard } from "../components/organisms/Card/PostCard/PostCard";
import { SearchInputField } from "../components/atoms/SearchInputField/SearchInputField";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { useIntersection } from "../utility/intersection";



export default function App() {

  /* --- state ------------------------------------------------------------------------------------------------------- */
  const [ searchWard, setSearchWard ] = useState("");

  /* --- 検索関連 ----------------------------------------------------------------------------------------------------- */
  const searchByPostContent = useCallback((searchWard: string): void => {
    setSearchWard(searchWard);
  }, [])

  /* --- 無限スクロール処理 --------------------------------------------------------------------------------------------- */
  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  const intersection = useIntersection(ref);

  const limit = 4;

  const getKey = (pageNumber: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    // pageIndexは0からのため+1をしてpageIndexを1からにする
    return Endpoint.getPosts({
      pageNumber: pageNumber + 1,
      limit,
      searchByPostContent: searchWard
    });
  };


  /* useSWRInfiniteで無限スクロール用に投稿取得 */
  const { data: posts, error, size, setSize } = useSWRInfinite( getKey, getPostsFetcher, { initialSize: 2 });

  const isEmpty = posts?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (posts && posts[posts.length - 1]?.length < limit);


  const getNextDataPosts = async () => {
    await setSize(size + 1);
  };

  useEffect(() => {
    // ローディングの確認用にsetTimeout
    setTimeout(() => {
      if (intersection && !isReachingEnd) {
        getNextDataPosts();
      }
    }, 1000)
  }, [intersection, isReachingEnd]);

  if (error) return "failed to load";
  if (!posts) return "loading";

  const postList = posts.flat();

  return (
    <div className={styles.homePage}>

      <SearchInputField
        onSearchFunction={searchByPostContent}
      />

      <div className={styles.postCardsFlow}>
        {postList.map((post, index) => (
          <PostCard targetPostData={post} key={index}/>
        ))}
      </div>

      {/* 次のデータを取得するトリガー */}
      <div ref={ref}>
        {!isReachingEnd ? "...Loading" : null}
        {isEmpty ? "取得するデータはありませんでした。" : null}
      </div>
    </div>
  );
}
