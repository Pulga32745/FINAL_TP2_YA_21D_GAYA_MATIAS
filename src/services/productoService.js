import { v4 as uuid } from 'uuid';
import repo from '../repository/productoRepositoryJson.js';

export default {
  create: ({ producto, stockAmount }) => {
    if (!producto || stockAmount < 0) throw { statusCode: 400, error: 'Datos inválidos' };

    return repo.save({
      id: uuid(),
      producto,
      stockAmount,
      fechaIngreso: new Date().toISOString().slice(0, 10),
    });
  },
};
