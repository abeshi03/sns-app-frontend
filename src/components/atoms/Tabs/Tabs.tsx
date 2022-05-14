/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, useState, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./Tabs.module.scss"


export type Tab<T = string> = {
  readonly label: string;
  key: T;
}

type Props = {
  tabs: Tab[];
  disabled?: boolean;
  onClickTabFunction: (tab: Tab<any>) => void;
}

const tabStyles = (isSelected: boolean): string => {
  if (isSelected) {
    return styles.tab__selected;
  }
  return "";
}

export const Tabs: VFC<Props> = memo((props) => {

  const { tabs, onClickTabFunction } = props;
  const [ selectedTabIndex, setSelectedTabIndex ] = useState(0);

  const onClickTab = (tab: Tab, indexInArray: number) => {
    setSelectedTabIndex(indexInArray)
    onClickTabFunction(tab);
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