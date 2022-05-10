/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from "next";
import {Tab, Tabs} from "../../components/atoms/Tab/Tab";

const tabs: Tabs.TabIdentifiedByKey[] = [
  {
    key: 1,
    label: "タブ1"
  },
  {
    key: 2,
    label: "タブ2"
  },
]

const TabSample: NextPage = () => {
  return (
    <div>
      <h1>タブ実装のサンプルページ</h1>
      <Tab tabs={tabs}/>
    </div>
  )
}

export default TabSample;
