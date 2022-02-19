/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./Pagination.module.scss";


type Props = {
  totalCount: number;
  currentPageNumber: number;
  perPageNumber: number;
  onChangePage: (pageNumber: number) => void;
  className?: string;
}

/* eslint-disable-next-line react/display-name */
export const Pagination: VFC<Props> = memo((props) => {

  const { totalCount, currentPageNumber, perPageNumber, onChangePage, className } = props;

  const NUMBERED_BUTTONS_COUNT__MUST_BE_ODD: number = 2;
  const totalPageCount = Math.ceil(totalCount / perPageNumber);

  const mustDisplayGoToFirstPageButton = (): boolean => {
    return currentPageNumber - (0.5 * (NUMBERED_BUTTONS_COUNT__MUST_BE_ODD - 1)) > 1;
  };

  const mustDisplayGoToLastPageButton = (): boolean => {
    return currentPageNumber < totalPageCount - (0.5 * (NUMBERED_BUTTONS_COUNT__MUST_BE_ODD - 1));
  };

  const totalPagesCount = (): number => {
    return Math.ceil(totalCount / perPageNumber);
  }


  return (
    <>
      { totalPageCount > 1 &&
        <nav className={`${styles.pagination} ${className}`}>

          { mustDisplayGoToFirstPageButton() &&
            <span
              className={styles.toFirstPageButton}
              role="button"
              aria-label="最初のページへ戻る"
              onClick={() => onChangePage(1)}
            >{ "<< 最初" }</span>
          }

          { currentPageNumber > 1 &&
            <span
              className={styles.toPreviousPageButton}
              role="button"
              aria-label="一つ前のページへ戻る"
              onClick={() => onChangePage(currentPageNumber - 1)}
            >{ "< 前" }</span>
          }

          { currentPageNumber > 2 &&
            <span
              role="button"
              className={styles.PageNumberButton}
              onClick={() => onChangePage(currentPageNumber - 2)}
            >{ currentPageNumber - 2 }</span>
          }

          { currentPageNumber > 1 &&
            <span
              role="button"
              className={styles.PageNumberButton}
              onClick={() => onChangePage(currentPageNumber - 1)}
            >{ currentPageNumber - 1 }</span>
          }

          <span className={styles.currentPageNumber}>{ currentPageNumber }</span>

          { currentPageNumber + 1 <= totalPageCount &&
            <span
              role="button"
              className={styles.PageNumberButton}
              onClick={() => onChangePage(currentPageNumber + 1)}
            >{ currentPageNumber + 1 }</span>
          }

          { currentPageNumber + 2 <= totalPageCount &&
            <span
              role="button"
              className={styles.PageNumberButton}
              onClick={() => onChangePage(currentPageNumber + 2)}
            >{ currentPageNumber + 2 }</span>
          }

          { currentPageNumber !== totalPageCount &&
            <span
              role="button"
              aria-label="次のページへ"
              className={styles.toNextPageButton}
              onClick={() => onChangePage(currentPageNumber + 1)}
            >{ "> 次" }</span>
          }

          { mustDisplayGoToLastPageButton() &&
            <span
              role="button"
              aria-label="最後のページへ"
              className={styles.toLastPageButton}
              onClick={() => onChangePage(totalPagesCount())}
            >{ ">> 最後" }</span>
          }

        </nav>
      }
    </>
  );
});
