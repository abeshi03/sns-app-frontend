/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, useState } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./Tabs.module.scss"


export type Tab<T = string> = {
  readonly label: string;
  key: T;
}

type Props<T = string> = {
  tabs: Tab<T>[];
  disabled?: boolean;
  onClickTabFunction: (tab: Tab<T>) => void;
}

const tabStyles = (isSelected: boolean): string => {
  if (isSelected) {
    return styles.tab__selected;
  }
  return "";
}

export function Tabs<TProps>(props: Props<TProps>): React.ReactElement {
  const { tabs, onClickTabFunction } = props;
  const [ selectedTabIndex, setSelectedTabIndex ] = useState(0);

  const onClickTab = (tab: Tab<TProps>, indexInArray: number) => {
    setSelectedTabIndex(indexInArray)
    onClickTabFunction(tab);
  }

  return (
    <ul className={styles.tabs} role="tablist">
      {tabs.map((tab: Tab<TProps>, index: number) => (
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
}

memo(Tabs);
