/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from 'next'
import { ChangeEvent, useState } from "react";
import Papa from "papaparse"


type userCsvData = {
  name: string;
  email: string;
  role: string;
}


const CsvDemo: NextPage = () => {

  const [ usersCsvData, setUsersCsvData ] = useState<userCsvData[]>([]);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {

    if (!event.target.files) return;
    const file: File = event.target.files[0];

    try {

      await Papa.parse<userCsvData>(file, {
        complete: function(results) {
          setUsersCsvData(results.data);
        },
        header: true,
        escapeChar: '"'
      });

    } catch (error: unknown) {

      if (error instanceof Error) {
        console.log("ファイルのアップロードに失敗しました", error.message);
      }
    }
  }

  return (
    <div>
      <h1>csvのimport確認</h1>
      <input type="file" accept="text/csv" onChange={handleFileSelect} />
      <table>
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
