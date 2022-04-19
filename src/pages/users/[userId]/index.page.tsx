/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./userDetailsPage.module.scss";

/* --- カスタムフック -------------------------------------------------------------------------------------------------- */
import { useUser } from "../../../hooks/useUser";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../lib/$path";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { Button } from "../../../components/atoms/Button/Button";


const UserDetailsPage = () => {

  const { user, userError, userLoading } = useUser();

  return (
    <div className={styles.userDetailsPage}>
      <h1>ユーザー詳細ページ</h1>
      { userLoading && <p>ロード中</p> }
      { userError && <p>エラー発生</p> }
      { user &&
        <>
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.description}</p>
          <Button
            color={"SKY_BLUE"}
            size={"BIG"}
            path={pagesPath.users._userId(user.id).edit.$url()}>
            ユーザー編集
          </Button>
        </>
      }

    </div>
  )
}


export default UserDetailsPage;
