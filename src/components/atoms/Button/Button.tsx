// - フレームワーク =======================================================================================================
import React, { memo, VFC, ReactNode } from "react";
import Link from "next/link";

// - アセット ============================================================================================================
import styles from "./button.module.scss";

// - 型定義 =============================================================================================================
import { UrlObject } from "url";

type Props = {
  className?: string;
  color: "SKY_BLUE" | "WHITE";
  size: "SMALL" | "BIG";
  path: string | UrlObject;
  type?: "submit"
  children: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}


export const Button: VFC<Props> = memo((props) => {
  const { className, color, path, children, size, style, onClick, type } = props;

  const ButtonColorModifierCSS_Class = (): string => {
    switch (color) {
      case "SKY_BLUE": return styles.button__skyBlue;
      case "WHITE": return styles.button__white;
    }
  };

  const ButtonSizeModifierCSS_Class = (): string => {
    switch (size) {
      case "SMALL": return styles.small;
      case "BIG": return styles.big;
    }
  };


  return (
    <>
      {type ? (
        <button
          onClick={onClick}
          className={`${ButtonColorModifierCSS_Class()} ${ButtonSizeModifierCSS_Class()} ${styles.button} ${className}`}
          type={type}
        >
          { children }
        </button>
      ) : (
        <Link href={path}>
          <a className={styles.path} style={style}>
            <button
              onClick={onClick}
              className={`${ButtonColorModifierCSS_Class()} ${ButtonSizeModifierCSS_Class()} ${styles.button}`}
              type={type}
            >
              { children }
            </button>
          </a>
        </Link>
      ) }
    </>
  );
});
