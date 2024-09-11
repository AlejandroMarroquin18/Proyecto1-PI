const express = require('express');
const app = express();
const port = 3000;
// Ruta raíz
app.get('/', (req, res) => {
  res.send('Holap');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
