import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// Ruta para compilar el proyecto Astro
app.post('/api/build', (req, res) => {
  // Ejecutar el comando de compilación
  exec('npm run build', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during build: ${stderr || error.message}`);
      return res.status(500).json({ success: false, message: 'Error al compilar el proyecto', details: stderr || error.message });
    }
    console.log(`Build successful: ${stdout}`);
    res.json({ success: true, message: 'Proyecto compilado exitosamente', output: stdout });
  });
});

app.use(cors());
app.use(express.json());

// Ruta para obtener datos de una sección
app.get('/api/:section', (req, res) => {
  const section = req.params.section;
  const filePath = path.join(__dirname, 'data', `${section}.json`); // Corregido template string

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading file' });
    res.json(JSON.parse(data));
  });
});

// Ruta para actualizar datos de una sección
app.put('/api/:section', (req, res) => {
  const section = req.params.section;
  const filePath = path.join(__dirname, 'data', `${section}.json`); // Corregido template string
  const newData = req.body;

  fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) return res.status(500).json({ error: 'Error writing file' });
    res.json({ message: 'Section updated successfully' });
  });
});

app.get('/backend', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Corregido template string
});