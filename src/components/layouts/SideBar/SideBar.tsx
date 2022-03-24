/* --- ライブラリー、フレームワーク --------------------------------------------------------------------------------------- */
import { VFC, memo, ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./SideBar.module.scss";
import { HomeIcon } from "../../../../styles/icons/HomeIcon";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../../../lib/$path";

/* --- 型定義 -------------------------------------------------------------------------------------------------------- */
import { UrlObject } from "url";



type Props = {
  children: ReactNode;
}

type Navigation = {
  pageName: string;
  path: UrlObject;
  icon: JSX.Element;
}

const navigations: Navigation[] = [
  {
    pageName: "トップ",
    path: pagesPath.$url(),
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ユーザー一覧",
    path: pagesPath.users.$url(),
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ユーザー追加",
    path: pagesPath.users.add.$url(),
    icon: <HomeIcon className={styles.icon}/>
  }
];



export const SideBar: VFC<Props> = memo((props) => {

  const { children } = props;

  const [ menuOpen, setMenuOpen ] = useState(true);

  const router = useRouter();

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
          <Link href={navigation.path} key={navigation.pageName}>
            <a
              className={styles.flexContainer}
              style={{ background: isPageActive(navigation.path) ? "#027fce" : "none" }}>
              { navigation.icon }
              { menuOpen && <p className={styles.pageName}>{ navigation.pageName }</p> }
            </a>
          </Link>
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
