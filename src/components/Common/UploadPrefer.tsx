import { UploadFile } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Preference } from "../../types";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../consts";

interface CSVData {
  [key: string]: string;
}

const parseCSV = (csvText: string): Preference[] => {
  const lines = csvText.split("\n").map((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",");
  const rows: CSVData[] = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce<CSVData>((acc, header, index) => {
      acc[header.trim()] = values[index]?.trim() || "";
      return acc;
    }, {});
  });

  const formattedData: Preference[] = rows.map((csv) => ({
    material: csv["Material"],
    form: csv["Form"],
    grade: csv["Grade"],
    choice: csv["Choice"],
    min_width: parseFloat(csv["Width (Min)"]),
    max_width: parseFloat(csv["Width (Max)"]),
    min_thickness: parseFloat(csv["Thickness (Min)"]),
    max_thickness: parseFloat(csv["Thickness (Max)"]),
  }));

  return formattedData;
};

export const UploadPrefer: React.FC = () => {
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState<Preference[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        const parsedData = parseCSV(csvText);

        setCsvData(parsedData);
        axios
          .post("http://localhost:4000/preference", parsedData)
          .finally(() => {
            console.log("Preference data is added!");
          });
      };
      reader.readAsText(file);
    }
  };

  const handleViewMatches = () => {
    navigate(PATH.VIEWMATCH, { state: csvData });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ padding: 2 }}
    >
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFile />}
        sx={{ marginRight: 2 }}
      >
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>
      {csvData.length > 0 && (
        <Button
          variant="contained"
          component="label"
          sx={{ marginRight: 2 }}
          onClick={handleViewMatches}
        >
          View Matches
        </Button>
      )}
    </Box>
  );
};
