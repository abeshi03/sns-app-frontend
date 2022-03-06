/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from 'next'
import { ChangeEvent, useState } from "react";
import Papa from "papaparse"

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./csvDemoPage.module.scss";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { AlertBox } from "../../components/molecules/AlertBox/AlertBox";


type userCsvData = {
  name: string;
  email: string;
  role: string;
}


const CsvDemo: NextPage = () => {

  const [ usersCsvData, setUsersCsvData ] = useState<userCsvData[]>([]);
  const [ isError, setIsError ] = useState(false);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {

    if (!event.target.files) return;
    const file: File = event.target.files[0];

    Papa.parse<userCsvData>(file, {
      complete: function(results) {
        const uploadObjectKeys = Object.keys(results.data[0]);

        if (
          !uploadObjectKeys.includes("name") || !uploadObjectKeys.includes("email") || !uploadObjectKeys.includes("role")
        ) {
          alert("アップロードに失敗しました。name, email, roleのcsvファイルのみアップロード可能です");
          setUsersCsvData([]);
          setIsError(true);
          return;
        }


        if (isError) {
          setIsError(false);
          setUsersCsvData([]);
        }
        setUsersCsvData(results.data);
      },
      header: true
    });
  }

  return (
    <div className={styles.csvDemoPage}>
      <h1>csvのimport確認</h1>
      <input type="file" accept="text/csv" onChange={handleFileSelect} />
      {usersCsvData.length === 0 && !isError &&
        <AlertBox
          className={styles.alertBox}
          title="ファイルをアップロードしてください"
          description="name, email, roleのcsvファイルをアップロードしてください"
          alertType="INFO"
        />
      }
      {isError &&
      <AlertBox
        className={styles.alertBox}
        title="無効な形式のcsvファイルです"
        description="name, email, roleのcsvファイルのみアップロードできます"
        alertType="ERROR"
      />
      }
      <table className={styles.table}>
        <thead>
          <tr>
            <td>名前</td>
            <td>メールアドレス</td>
            <td>権限</td>
          </tr>
        </thead>
        <tbody>
          {usersCsvData.map((userCsvData) => (
            <tr key={userCsvData.email}>
              <td>{userCsvData.name}</td>
              <td>{userCsvData.email}</td>
              <td>{userCsvData.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CsvDemo;
