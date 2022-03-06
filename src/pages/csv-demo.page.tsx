/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from 'next'
import { ChangeEvent, useState } from "react";
import Papa from "papaparse"


type CsvData = {
  name: string;
  email: string;
  role: string;
}


const CsvDemo: NextPage = () => {

  const [ csvData, setCsvData ] = useState<CsvData[]>([]);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {

    if (!event.target.files) return;

    const file: File = event.target.files[0];

    try {

      await Papa.parse<CsvData>(file, {
        complete: function(results) {
          setCsvData(results.data);
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
      {csvData.map((csv) => (
        <>
          <p>{csv.name}</p>
          <p>{csv.email}</p>
          <p>{csv.role}</p>
        </>
      ))}
    </div>
  )
}

export default CsvDemo;
