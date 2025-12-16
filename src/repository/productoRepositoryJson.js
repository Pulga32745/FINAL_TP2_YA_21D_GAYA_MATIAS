import fs from 'fs';
const DB = './database/database.json';

const read = () => JSON.parse(fs.readFileSync(DB));
const write = (d) => fs.writeFileSync(DB, JSON.stringify(d, null, 2));

export default {
  findAll: () => read(),
  findById: id => read().find(p => p.id === id),
  save: p => { const d = read(); d.push(p); write(d); return p; },
  update: (id, data) => {
    const d = read();
    const i = d.findIndex(p => p.id === id);
    if (i === -1) return null;
    d[i] = { ...d[i], ...data };
    write(d); return d[i];
  },
  delete: id => write(read().filter(p => p.id !== id))
};