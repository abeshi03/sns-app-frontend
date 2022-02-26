/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from 'next'
import Link from "next/link";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../lib/$path";

const Home: NextPage = () => {

  return (
    <>
      <Link href={pagesPath.users.$url()}>
        <a style={{color: "blue", textDecoration: "underline"}}>ユーザー一覧</a>
      </Link>
    </>
  )
}

export default Home
