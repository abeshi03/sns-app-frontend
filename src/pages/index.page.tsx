import React, { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import {useIntersection} from "../utility/intersection";
import {Post} from "../type/Post";
import {Endpoint} from "../constants/endpoints";
import {getPostsFetcher} from "../apis/PostsApi";

type PicReturnType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function App() {
  // トリガーのdiv要素への参照
  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<
    HTMLDivElement
    >;
  // トリガーが表示されているか監視
  const intersection = useIntersection(ref);
  const limit = 2;
  // useSWRInfiniteのキーとなるパラメータ付きURLを生成
  const getKey = (pageNumber: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    // pageIndexは0からのため+1をしてpageIndexを1からにする
    return Endpoint.getPosts({ pageNumber: pageNumber + 1, limit })
  };
  // fetch　を使用してデータを取得
  const { data: posts, error, size, setSize } = useSWRInfinite( getKey, getPostsFetcher, { initialSize: 2 });

  const isEmpty = posts?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (posts && posts[posts.length - 1]?.length < limit);

  // 次のデータの取得
  const getPosts = async () => {
    await setSize(size + 1);
  };

  useEffect(() => {
    // トリガーが表示されたらデータを取得
    if (intersection && !isReachingEnd) {
      getPosts();
    }
  }, [intersection, isReachingEnd]);

  if (error) return "failed to load";
  if (!posts) return "loading";

  const postList = posts.flat();

  return (
    <div className="App">
      <h2>SWRを使った無限スクロール</h2>
      {postList.map((post, i) => (
        <>
          <p>{post.id}</p>
          <p>{post.content}</p>
          <p>{post.postedDateTime}</p>
          <p>------------------------------</p>
        </>
      ))}

      <button onClick={() => setSize(size + 1)}>読み込み</button>
      {/* 次のデータを取得するトリガー */}
      <div ref={ref}>
        {!isReachingEnd ? "読み込み中" : "すべて読み込みました。"}
        {isEmpty ? "取得するデータはありませんでした。" : null}
      </div>
    </div>
  );
}
