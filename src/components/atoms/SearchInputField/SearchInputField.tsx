/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { Dispatch, memo, SetStateAction, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

/* --- アセット ------------------------------------------------------------------------------------------------------- */

type Props = {
  setStateSearchWard: Dispatch<SetStateAction<string>>;
  setStatePageNumber?: Dispatch<SetStateAction<number>>;
}


/* フォームの型定義 */
type Input = {
  searchWard: string;
};


/* eslint-disable-next-line react/display-name */
export const SearchInputField: VFC<Props> = memo((props) => {

  const { setStateSearchWard, setStatePageNumber } = props;

  const { register, handleSubmit } = useForm<Input>();
  const onSearch: SubmitHandler<Input> = data => {

    if (setStatePageNumber) {
      setStatePageNumber(1);
    }

    setStateSearchWard(data.searchWard);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSearch)}>
        <input {...register("searchWard")} />
        <button type="submit">検索</button>
      </form>
    </>
  );
});
