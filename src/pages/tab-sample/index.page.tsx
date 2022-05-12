/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from "next";
import { Tabs, Tab } from "../../components/atoms/Tabs/Tabs";
import { useState } from "react";

const TabSample: NextPage = () => {

  const [ activeTab, setActiveTab ] = useState<string>("タブ1");

  const tabs: Tab[] = [
    {
      label: "タブ1",
      key: "タブ1",
      selected: activeTab === "タブ1"
    },
    {
      label: "タブ2",
      key: "タブ2",
      selected: activeTab === "タブ2"
    },
    {
      label: "タブ3",
      key: "タブ3",
      selected: activeTab === "タブ3"
    },
  ]


  return (
    <div>
      <h1>タブ実装のサンプルページ</h1>
      <Tabs
        tabs={tabs}
        setActiveTab={setActiveTab}
      />
      {activeTab === "タブ1" && <p>タブ1</p>}
      {activeTab === "タブ2" && <p>タブ2</p>}
      {activeTab === "タブ3" && <p>タブ3</p>}
    </div>
  )
}

export default TabSample;
