import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import * as c from '../controllers/productoController.js';
import { generateCSV } from '../services/albumsService.js';

const r = express.Router();

r.post('/productos', c.createProducto);
r.get('/productos', c.getAll);
r.get('/productos/:id', c.getById);
r.put('/productos/:id', auth, c.update);
r.delete('/productos/:id', auth, c.remove);

r.get('/albums/csv', async (_, res) => {
  const csv = await generateCSV();
  res.type('text/csv').send(csv);
});

export default r;
