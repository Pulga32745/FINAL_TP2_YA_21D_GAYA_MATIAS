import repo from '../repository/productoRepositoryJson.js';
import service from '../services/productoService.js';

export const createProducto = (req,res)=>{
  try { res.status(201).json(service.create(req.body)); }
  catch(e){ res.status(e.statusCode).json(e); }
};

export const getAll = (_,res)=>res.json(repo.findAll());

export const getById = (req,res)=>{
  const p = repo.findById(req.params.id);
  if(!p) return res.status(404).json({statusCode:404,error:'Producto no encontrado'});
  res.json(p);
};

export const update = (req, res) => {
  const { id } = req.params;
  const { stockAmount } = req.body;

  const productoActual = repo.findById(id);
  if (!productoActual) {
    return res.status(404).json({
      statusCode: 404,
      error: 'Producto no encontrado'
    });
  }

  if (stockAmount !== undefined) {
    if (!Number.isInteger(stockAmount)) {
      return res.status(400).json({
        statusCode: 400,
        error: 'El stock debe ser un entero'
      });
    }

    const diferencia = stockAmount - productoActual.stockAmount;

    if (Math.abs(diferencia) !== 1) {
      return res.status(400).json({
        statusCode: 400,
        error: 'El stock solo puede incrementarse o decrementarse de a 1'
      });
    }

    if (stockAmount < 1) {
      return res.status(400).json({
        statusCode: 400,
        error: 'El stock no puede ser menor a 1'
      });
    }
  }

  const p = repo.update(id, req.body);
  res.status(200).json(p);
};



export const remove = (req, res) => {
  const { id } = req.params;

  const producto = repo.findById(id);
  if (!producto) {
    return res.status(404).json({
      statusCode: 404,
      error: `No existe un producto con id ${id}`
    });
  }

  repo.delete(id);

  res.status(200).json({
    message: `El producto con id ${id} fue eliminado correctamente`
  });
};