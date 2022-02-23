/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, useState, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { useSetRecoilState } from "recoil";

/* --- グローバルstate ------------------------------------------------------------------------------------------------ */
import { floatingNotificationBarState } from "../../../../store/floatingNotificationBar/floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./ImageUploader.module.scss";
import { ImageDeletingIcon } from "../../../../../styles/icons/ImageDeletingIcon";
import { ImageAddingIcon } from "../../../../../styles/icons/ImageAddingIcon";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { isUndefined } from "../../../../utility/typeGuard/isUndefined";
import { isNull } from "../../../../utility/typeGuard/isNull";
import { isNotUndefined } from "../../../../utility/typeGuard/isNotUndefined";
import { encodeFileToBase64 } from "../../../../utility/encodeFileToBase64";


type Props = {
  label?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  accept?: string;
  maximalImagesCount?: number;
  minimalImagesCount?: number;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}


const getImageUploadGuidance = (maximalImagesCount: number | undefined): string => {

  if (isUndefined(maximalImagesCount)) {
    return "画像をアップロードしてください(ドラック&ドロップ可)";
  }

  if (maximalImagesCount === 1) {
    return `画像を${maximalImagesCount}枚アップロードしてください(ドラック&ドロップ可)`;
  }

  return `画像を${maximalImagesCount}枚までアップロードしてください(ドラック&ドロップ可)`;
}

const isMultipleFiles = (maximalImagesCount: number | undefined): boolean => {
  return isUndefined(maximalImagesCount) || maximalImagesCount > 1;
}


export const ImageUploader: VFC<Props> = memo((props) => {

  const {
    label,
    required,
    guidance,
    disabled,
    defaultValue,
    accept,
    maximalImagesCount,
    inputProps
  } = props;


  const [ isDisplayOverlay, setIsDisplayOverlay ] = useState(false);
  const [ imagesURI, setImagesURI ] = useState<string[]>([]);
  const displayNotificationBar = useSetRecoilState(floatingNotificationBarState);


  /* --- 画像選択時の処理(ドラッグ&ドロップ可) ----------------------------------------------------------------------------- */
  const onDrop = async (acceptedFiles: File[]): Promise<void> => {

    if (acceptedFiles.length === 0) return;

    const file: File = acceptedFiles[0];

    if (isNull(file)) {
      displayNotificationBar({
        notification: {
          type: "ERROR",
          message: "アップロードに失敗いたしました。"
        }
      })
      return;
    }

    // const isDisallowedFileType: boolean = !new RegExp(
    //   `^[^.]+?.(?<filenameExtension>${supportedImagesFileExtensions.join("|")})$`, "ui"
    // ).test(file.name);
    //
    // if (isDisallowedFileType) {
    //   dispatch(displayFloatingNotificationBar({
    //     notification: {
    //       type: "ERROR",
    //       message: `アップロードの画像の拡張子が許可されておりません。${supportedImagesFileExtensions.join(", ")}が選択可能です。`
    //     }
    //   }));
    //   return
    // }


    if (isNotUndefined(maximalImagesCount) && maximalImagesCount <= imagesURI.length) {
      displayNotificationBar({
        notification: {
          type: "ERROR",
          message: `画像は${maximalImagesCount}枚のみ選択可能です`
        }
      });
      return;
    }


    setIsDisplayOverlay(true);

    /* --- 画像エンコード処理 ------------------------------------------------------------------------------------------- */
    try {

      setImagesURI(await Promise.all(
        acceptedFiles.map(async (imageFile: File): Promise<string> => encodeFileToBase64(imageFile))
      ));

      setIsDisplayOverlay(false);

    } catch (error: unknown) {

      console.log(error, "画像ファイルをbase64に変換する処理が失敗しました");
      displayNotificationBar({
        notification: {
          type: "ERROR",
          message: "画像のアップロードに失敗いたしました"
        }
      });

    } finally {

      setIsDisplayOverlay(false);
    }
  }


  /* --- 画像削除処理 -------------------------------------------------------------------------------------------------- */
  const deleteImage = (targetImageIndex: number): void => {
    setImagesURI(prevArray => prevArray.splice(targetImageIndex, 1));
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.imageUploader}>
      <InputLabel
        required={required}
        label={label}
      />

      <div className={styles.imageUploadArea} {...getRootProps()}>

        <div className={styles.uploadButton} role="button">
          <div className={styles.icon}>
            <ImageAddingIcon/>
          </div>
          <p className={styles.uploadGuidance}>{getImageUploadGuidance(maximalImagesCount)}</p>

          {/*labelでinputを囲って全体をクリックできるようにしている*/}
          <label className={styles.inputClickFlag}>
            <input
              { ...inputProps }
              {...getInputProps()}
              className={styles.inputFiles}
              type="file"
              defaultValue={defaultValue}
              accept={accept}
              multiple={isMultipleFiles(maximalImagesCount)}
              disabled={disabled}
            />
          </label>

          {/*ローディング処理 ================================================ */}
          {isDisplayOverlay &&
          <div className={styles.blockingLoadingOverlay}>
            <div className={styles.loadingIndicator}></div>
          </div>
          }
        </div>
      </div>

      {imagesURI.length > 0 &&
      <div className={styles.uploadImagesFlow}>
        {imagesURI.map((imageFileURI: string, index: number) => (
          <div
            className={styles.uploadedImageThumbnail}
            key={`UPLOAD_IMAGE-${index}`}
            style={{backgroundImage: `url(${imageFileURI})`}}
            role="img"
          >
            <div
              className={styles.deleteButton}
              role="button"
              aria-label="画像を削除する"
              onClick={() => deleteImage(index)}
            >
              <ImageDeletingIcon/>
            </div>
          </div>
        ))}
      </div>
      }

      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
