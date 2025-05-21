'use client';

import { useState } from 'react';
import ExcelJS from 'exceljs';
import { Button } from '@/components/ui/button';

export function ExcelUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      // Example: Read first worksheet
      const worksheet = workbook.getWorksheet(1);
      const data = [];
      worksheet.eachRow((row, rowNumber) => {
        data.push(row.values);
      });

      console.log('Excel Data:', data);
      setError(null);
      // Add API call to send data to backend
    } catch (err) {
      setError('Error reading file');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <Button onClick={handleUpload} className="bg-emerald-600 hover:bg-emerald-700">
        Upload Excel
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}