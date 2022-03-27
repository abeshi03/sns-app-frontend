/* --- ライブラリー、フレームワーク --------------------------------------------------------------------------------------- */
import React, { VFC, memo, ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";

/* --- グローバルstate ------------------------------------------------------------------------------------------------ */
import { currentUserState } from "../../../store/auth/authState";
import { floatingNotificationBarState } from "../../../store/floatingNotificationBar/floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./SideBar.module.scss";
import { HomeIcon } from "../../../../styles/icons/HomeIcon";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../lib/$path";

/* --- Api ---------------------------------------------------------------------------------------------------------- */
import { AuthApi } from "../../../apis/AuthApis";

/* --- 型定義 -------------------------------------------------------------------------------------------------------- */
import { UrlObject } from "url";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { isNotNull } from "../../../utility/typeGuard/isNotNull";
import { isNull } from "../../../utility/typeGuard/isNull";


type Props = {
  children: ReactNode;
}

type Navigation = {
  pageName: string;
  path: UrlObject;
  icon: JSX.Element;
  isDisplay: boolean;
  onClickFunction?: () => void;
}


export const SideBar: VFC<Props> = memo((props) => {

  const { children } = props;

  const [ menuOpen, setMenuOpen ] = useState(true);
  const currentUser = useRecoilValue(currentUserState).currentUser;
  const setFloatingNotificationBar = useSetRecoilState(floatingNotificationBarState);
  const setCurrentUserState = useSetRecoilState(currentUserState);
  const router = useRouter();


  const signOut = async (): Promise<void> => {
    try {

      await AuthApi.signOut();

      setCurrentUserState({
        currentUser: null
      });

      await router.replace(pagesPath.sign_in.$url());

      setFloatingNotificationBar({
        notification: {
          type: "SUCCESS",
          message: "ログアウトしました"
        }
      });

    } catch (error: unknown) {

      console.error(error);
      setFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "ログアウトに失敗いたしました"
        }
      });
    }
  }

  const navigations: Navigation[] = [
    {
      pageName: "トップ",
      path: pagesPath.$url(),
      icon: <HomeIcon className={styles.icon}/>,
      isDisplay: true
    },
    {
      pageName: "ユーザー一覧",
      path: pagesPath.users.$url(),
      icon: <HomeIcon className={styles.icon}/>,
      isDisplay: true
    },
    {
      pageName: "ユーザー追加",
      path: pagesPath.users.add.$url(),
      icon: <HomeIcon className={styles.icon}/>,
      isDisplay: true
    },
    {
      pageName: "ログイン",
      path: pagesPath.sign_in.$url(),
      icon: <HomeIcon className={styles.icon}/>,
      isDisplay: isNull(currentUser)
    },
    {
      pageName: "ログアウト",
      path: {},
      icon: <HomeIcon className={styles.icon}/>,
      isDisplay: isNotNull(currentUser),
      onClickFunction: signOut
    },
  ];


  const isPageActive = (pagePath: UrlObject): boolean => {
    return pagePath.pathname === router.route
  }


  return (
    <div className={styles.root}>

      <aside className={styles.sidebar} style={{ width: menuOpen ? "200px" : "30px" }}>
        <div className={styles.hamburger} role="button" onClick={() => setMenuOpen(!menuOpen)}>
          {[...Array(3)].map((_, index: number) => (
            <span className={menuOpen ? styles.menuCloseArrow : styles.menuOpenArrow} key={index}></span>
          ))}
        </div>
        {navigations.map((navigation) => (
          <React.Fragment key={navigation.pageName}>
            {navigation.isDisplay && !navigation.onClickFunction &&
              <Link href={navigation.path}>
                <a
                  className={styles.flexContainer}
                  role="navigation"
                  style={{ background: isPageActive(navigation.path) ? "#027fce" : "none" }}>
                  { navigation.icon }
                  { menuOpen && <p className={styles.pageName}>{ navigation.pageName }</p> }
                </a>
              </Link>
            }
            {navigation.isDisplay && navigation.onClickFunction &&
              <div
                className={styles.flexContainer}
                role="navigation"
                onClick={navigation.onClickFunction}
              >
                { navigation.icon }
                { menuOpen && <p className={styles.pageName}>{ navigation.pageName }</p> }
              </div>
            }
          </React.Fragment>
        ))}
      </aside>

      <main className={styles.mainContentBlock}>
        <div className={styles.contents}>
          {children}
        </div>
      </main>
    </div>
  )
})
