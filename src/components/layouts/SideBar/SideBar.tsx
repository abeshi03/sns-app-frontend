/* --- ライブラリー、フレームワーク --------------------------------------------------------------------------------------- */
import { VFC, memo, ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./SideBar.module.scss";
import { HomeIcon } from "../../../../styles/icons/HomeIcon";
import {pagesPath} from "../../../lib/$path";



type Props = {
  children: ReactNode;
}

type Navigation = {
  pageName: string;
  path: string;
  icon: JSX.Element;
}

const navigations: Navigation[] = [
  {
    pageName: "トップ",
    path: "/",
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ユーザー一覧",
    path: "/users",
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ユーザー追加",
    path: "/users/add",
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ページ4",
    path: "/page4",
    icon: <HomeIcon className={styles.icon}/>
  },

]

/* eslint-disable-next-line react/display-name */
export const SideBar: VFC<Props> = memo((props) => {

  const { children } = props;

  const [ menuOpen, setMenuOpen ] = useState(true);

  const router = useRouter();

  const isPageActive = (pagePath: string): boolean => {
    return pagePath === String(router.route)
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
