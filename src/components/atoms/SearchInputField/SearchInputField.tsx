/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

/* --- アセット ------------------------------------------------------------------------------------------------------- */

type Props = {
  onSearchFunction: (searchWard: string) => void;
}


/* フォームの型定義 */
type Input = {
  searchWard: string;
};


export const SearchInputField: VFC<Props> = memo((props) => {

  const { onSearchFunction } = props;

  const { register, handleSubmit, reset } = useForm<Input>();
  const onSearch: SubmitHandler<Input> = data => {
    onSearchFunction(data.searchWard);
    reset();
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
