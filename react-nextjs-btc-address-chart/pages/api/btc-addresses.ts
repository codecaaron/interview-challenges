import { NextApiRequest, NextApiResponse } from "next";
import { LABELS, Day } from "../../constants/day";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const csvRes = await fetch(
    `http://${_.headers.host}/data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv`
  );
  const csvText = await csvRes.text();
  /** This is a bit of a hacky implementation here done for time. In a real version of this the parsing of the CSV can just be handled by a separate module that can handle this safely. */
  const formattedText = csvText.replace(/"/g, "");
  const [cols, ...rows] = formattedText.split("\n");
  const columns = cols
    .split("\t")
    .map((value) => LABELS[value as keyof typeof LABELS]);
  const data = rows.map((row) => {
    const rowData = {} as Day;
    row.split("\t").forEach((val, i) => {
      const key = columns[i];
      const numericValue = Number(val);

      rowData[key] = Number.isNaN(numericValue)
        ? new Date(val).getTime()
        : numericValue;
    });
    return rowData;
  });
  res.status(200).json(data);
};
