/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { Button } from "../../atoms/Button/Button";

type Props = {
  resetFunction: () => void;
  className?: string;
}

/* eslint-disable-next-line react/display-name */
export const NoSearchGroup: VFC<Props> = memo((props) => {

  const { resetFunction, className } = props;

  return (
    <div className={className}>
      <p>該当する検索結果はありません</p>
      <Button color={"SKY_BLUE"} size={"BIG"} path={"#"} onClick={resetFunction}>検索リセット</Button>
    </div>
  );
});
