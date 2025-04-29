const express = require('express');
const curp = require('curp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('API de CURP funcionando');
});

// Ruta para generar CURP
app.post('/api/generar', (req, res) => {
  try {
    const { 
      nombre, 
      apellidoPaterno, 
      apellidoMaterno, 
      genero, 
      fechaNacimiento, 
      estado 
    } = req.body;

    let persona = curp.getPersona();
    persona.nombre = nombre;
    persona.apellidoPaterno = apellidoPaterno;
    persona.apellidoMaterno = apellidoMaterno;
    persona.genero = genero;
    persona.fechaNacimiento = fechaNacimiento;
    persona.estado = estado;

    const curpGenerado = curp.generar(persona);
    res.json({ curp: curpGenerado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para validar CURP
app.post('/api/validar', (req, res) => {
  try {
    const { curp: curpAValidar } = req.body;
    if (!curpAValidar) {
      return res.status(400).json({ error: 'Se requiere el CURP para validar' });
    }
    const esValido = curp.validar(curpAValidar);
    res.json({ valido: esValido });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});