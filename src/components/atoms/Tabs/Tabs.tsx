/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, {Dispatch, memo, SetStateAction, useEffect, useState, VFC} from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./Tabs.module.scss"


export type Tab = {
  readonly label: string;
  key: string;
  selected?: boolean;
}

type Props = {
  tabs: Tab[];
  disabled?: boolean;
  setActiveTab:  Dispatch<SetStateAction<string>>;
}

const tabStyles = (isSelected: boolean): string => {
  if (isSelected) {
    return styles.tab__selected;
  }
  return "";
}

export const Tabs: VFC<Props> = memo((props) => {

  const { tabs, setActiveTab } = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onClickTab = (tab: Tab, indexInArray: number) => {
    setSelectedTabIndex(indexInArray);
    setActiveTab(tab.key);
  }

  return (
    <ul className={styles.tabs} role="tablist">
      {tabs.map((tab: Tab, index: number) => (
        <li
          className={`${styles.tab} ${tabStyles(index === selectedTabIndex)}`}
          role="tab"
          key={`TAD-${index}`}
          tabIndex={0}
          onClick={() => onClickTab(tab, index)}
        >
          { tab.label }
        </li>
      ))}
    </ul>
  );
});
