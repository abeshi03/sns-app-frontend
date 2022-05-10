/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React, { memo, VFC } from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./Tab.module.scss"

export namespace Tabs {
  type TabCommonProperties = {
    readonly label: string;
    readonly selected?: boolean;
  };

  export type TabIdentifiedByKey =
    TabCommonProperties &
    {
      readonly key: string | number;
    };

  export type TabIdentifiedByEntity =
    TabCommonProperties &
    {
      readonly relatedEntity: unknown;
    };
  export type Tab = TabIdentifiedByKey | TabIdentifiedByEntity;
}

type Props = {
  tabs: Tabs.Tab[];
  disabled?: boolean;
  tabClickFunction?: () => void;
}

export const Tab: VFC<Props> = memo((props) => {

  const { tabs, disabled, tabClickFunction } = props;

  return (
    <ul className={styles.tabs} role="tablist">
      {tabs.map((tab: Tabs.Tab, index: number) => (
        <li
          className={styles.tab}
          role="tab"
          key={`TAD-${index}`}
          tabIndex={0}
          onClick={tabClickFunction}
        >
          { tab.label }
        </li>
      ))}
    </ul>
  );
});
