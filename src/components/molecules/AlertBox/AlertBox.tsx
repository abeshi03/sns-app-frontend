/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./AlertBox.module.scss";
import { ErrorIcon } from "../../../../styles/icons/ErrorIcon";
import { SuccessIcon } from "../../../../styles/icons/SuccessIcon";
import { InfoIcon } from "../../../../styles/icons/InfoIcon";
import { WarningIcon } from "../../../../styles/icons/WarningIcon";

type AlertType = "ERROR" | "INFO" | "WARNING" | "SUCCESS";

type AlertBoxProps = {
  title: string;
  description: string;
  alertType: AlertType;
  className?: string;
};

const selectedIcon = (alertType: AlertType): JSX.Element => {
  switch (alertType) {
    case "ERROR": return <ErrorIcon />;
    case "INFO": return <InfoIcon />;
    case "WARNING": return <WarningIcon />;
    case "SUCCESS": return <SuccessIcon />;
  }
};

const alertTypeModifierCSS_Class = (alertType: AlertType): string => {
  switch (alertType) {
    case "ERROR":
      return styles.alertBox__Error;
    case "INFO":
      return styles.alertBox__Info;
    case "WARNING":
      return styles.alertBox__Warning;
    case "SUCCESS":
      return styles.alertBox__Success;
  }
};


export const AlertBox: VFC<AlertBoxProps> = memo((props) => {

  const { title, description, alertType, className } = props;

  return (
    <div className={`${alertTypeModifierCSS_Class(alertType)} ${styles.alertBox} ${className}`}>
      <div className={styles.leftColumn}>
        <div className={styles.icon}>{ selectedIcon(alertType) }</div>
      </div>
      <div className={styles.rightColumn}>
        <p className={styles.alertTitle}>{ title }</p>
        <p className={styles.alertDescription}>{ description }</p>
      </div>
    </div>
  );
});
