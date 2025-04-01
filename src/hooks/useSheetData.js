import { useEffect, useState } from "react";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQlTntCvB4MUa3swY1Kn1687Zljfz5j6xtqWr3eM5EFeZDnZSGnpj1KNWROsEI26ieYatO_7QoNLsG/pub?gid=0&single=true&output=csv";

export default function useSheetData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv
          .trim()
          .split("\n")
          .map((r) => r.split(",").map((cell) => cell.trim()));

        if (rows.length < 2) return;

        const names = rows[1].slice(1).filter((name) => name !== "");

        // ✅ Fjern rader uten noen tall
        const dataRows = rows.slice(2).filter((row) => {
          const values = row.slice(1).map((cell) => parseInt(cell, 10));
          return values.some((val) => !isNaN(val));
        });

        const days = dataRows.map((r) => r[0]);

        const values = dataRows.map((r) =>
          r.slice(1, names.length + 1).map((val) => {
            const num = parseInt(val, 10);
            return isNaN(num) ? null : num;
          })
        );

        setData({ names, days, values });
      })
      .catch((err) => {
        console.error("Feil ved henting/parsing av CSV:", err);
      });
  }, []);

  return data;
}
