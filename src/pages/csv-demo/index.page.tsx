/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from 'next'
import { ChangeEvent, useState } from "react";
import Papa from "papaparse"
import styles from "./csvDemoPage.module.scss";


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
        const keys = Object.keys(results.data[0]);

        if (!keys.includes("name") || !keys.includes("email") || !keys.includes("role")) {
          alert("アップロードに失敗しました。name, email, roleのcsvファイルのみアップロード可能です");
          setIsError(true);
          return;
        }
        setIsError(false);
        setUsersCsvData(results.data);
      },
      header: true
    });
  }

  return (
    <div className={styles.csvDemoPage}>
      <h1>csvのimport確認</h1>
      <input type="file" accept="text/csv" onChange={handleFileSelect} />
      {usersCsvData.length === 0 && !isError && <p>csvファイルをアップロードしてください</p>}
      {isError && <p>無効なcsvファイルです</p>}
      <table className={styles.table}>
        <tr>
          <td>名前</td>
          <td>メールアドレス</td>
          <td>権限</td>
        </tr>
        <tbody>
          {usersCsvData.map((userCsvData) => (
            <tr>
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
