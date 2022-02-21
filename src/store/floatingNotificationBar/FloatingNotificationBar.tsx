/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, useEffect, VFC } from "react";

/* --- グローバルstate ------------------------------------------------------------------------------------------------- */
import { useRecoilState } from "recoil";
import { floatingNotificationBarState } from "./floatingNotificationBarState";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./FloatingNotificationBar.module.scss";
import { ErrorIcon } from "../../../styles/icons/ErrorIcon";
import { InfoIcon } from "../../../styles/icons/InfoIcon";
import { WarningIcon } from "../../../styles/icons/WarningIcon";
import { SuccessIcon } from "../../../styles/icons/SuccessIcon";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { AlertType } from "../../type/AlertType";

const variationModifierCSS_Class = (type: AlertType): string => {
  switch (type) {
    case "ERROR": return styles.floatingNotificationBar__error;
    case "WARNING": return styles.floatingNotificationBar__warning;
    case "INFO" : return styles.floatingNotificationBar__info;
    case "SUCCESS" : return styles.floatingNotificationBar__success;
  }
}


const getIcon = (type: AlertType): JSX.Element => {
  switch (type) {
    case "ERROR": return <ErrorIcon/>;
    case "WARNING": return <WarningIcon/>;
    case "INFO" : return <InfoIcon/>;
    case "SUCCESS" : return  <SuccessIcon/>;
  }
}


export const FloatingNotificationBar: VFC = memo(() => {

  const [ state, setState ] = useRecoilState(floatingNotificationBarState);

  useEffect(() => {

    // - FloatingNotificationBarが表示されている場合、5秒後に非表示にする
    if (state.notification) {
      const hiddenTimer = setTimeout(() => {
        setState({
          notification: undefined
        });
      }, 5000)

      return () => {
        clearTimeout(hiddenTimer);
      }
    }
  }, [ state.notification, setState ])

  return (
    <>
      {state.notification &&
      <div className={`${styles.floatingNotificationBar} ${variationModifierCSS_Class(state.notification.type)}`}>
        <div className={styles.icon}>
          { getIcon(state.notification.type) }
        </div>
        <p className={styles.message}>{ state.notification.message }</p>
        <div
          className={styles.closeButton}
          role="button"
          onClick={() => setState({ notification: undefined })}
        >{'×'}</div>
      </div>
      }
    </>
  );
});
