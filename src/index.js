require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const downloadRoutes = require('./download-manager/interfaces/http/routes/downloadRoutes');
const Container = require('./infrastructure/container');

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Inicializar el contenedor de dependencias
const container = new Container();

// Configurar rutas
app.use('/api/v1', downloadRoutes(container.getDownloadController()));

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Using mock services for data storage and content verification');
}); 