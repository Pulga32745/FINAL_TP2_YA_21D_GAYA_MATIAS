import axios from 'axios';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

export const generateCSV = async () => {
  const r = await axios.get('https://jsonplaceholder.typicode.com/albums');
  const data = r.data.slice(0, 15);

  const writer = createObjectCsvWriter({
    path: './database/albums_15.csv',
    header: [
      { id: 'userId', title: 'userId' },
      { id: 'id', title: 'id' },
      { id: 'title', title: 'title' },
    ],
  });

  await writer.writeRecords(data);
  return fs.readFileSync('./database/albums_15.csv');
};
