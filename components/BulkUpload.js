import React, { useState } from 'react';
import Papa from 'papaparse';
import ExcelJS from 'exceljs';
import { api } from '../lib/api';

export default function BulkUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          complete: async (result) => {
            const players = result.data.map(row => ({
              name: row[0],
              email: row[1],
            }));
            await api.post('/players', players);
            setSuccess('Players uploaded successfully');
            onUpload();
          },
          header: false,
          skipEmptyLines: true,
        });
      } else if (file.name.endsWith('.xlsx')) {
        const workbook = new ExcelJS.Workbook();
        const buffer = await file.arrayBuffer();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        const players = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            players.push({
              name: row.getCell(1).value,
              email: row.getCell(2).value,
            });
          }
        });
        await api.post('/players', players);
        setSuccess('Players uploaded successfully');
        onUpload();
      } else {
        setError('Unsupported file format. Use CSV or XLSX.');
      }
    } catch (err) {
      setError('Failed to upload players');
    }
  };

  return (
    <div className="bulk-upload">
      <h3 className="text-xl font-bold text-burnished-gold mb-4 font-cinzel">Upload Players</h3>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-emerald-green mt-2">{success}</p>}
    </div>
  );
}