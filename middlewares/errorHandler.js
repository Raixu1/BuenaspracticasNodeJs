module.exports = (err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
};