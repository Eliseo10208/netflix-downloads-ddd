const express = require('express');
const router = express.Router();

module.exports = (downloadController) => {
    // Iniciar una descarga
    router.post('/downloads', async (req, res) => {
        try {
            const download = await downloadController.startDownload(req.body);
            res.status(200).json({
                message: 'Download started successfully',
                download
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    // Obtener una descarga por ID
    router.get('/downloads/:id', async (req, res) => {
        try {
            const download = await downloadController.getDownloadById(req.params.id);
            if (!download) {
                return res.status(404).json({ error: 'Download not found' });
            }
            res.status(200).json(download);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Obtener descargas de un usuario
    router.get('/downloads/user/:userId', async (req, res) => {
        try {
            const downloads = await downloadController.getDownloadsByUserId(req.params.userId);
            res.status(200).json(downloads);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Actualizar progreso de descarga
    router.patch('/downloads/:id/progress', async (req, res) => {
        try {
            const download = await downloadController.updateDownloadProgress(
                req.params.id,
                req.body.progress
            );
            if (!download) {
                return res.status(404).json({ error: 'Download not found' });
            }
            res.status(200).json(download);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Cancelar descarga
    router.post('/downloads/:id/cancel', async (req, res) => {
        try {
            const download = await downloadController.cancelDownload(req.params.id);
            if (!download) {
                return res.status(404).json({ error: 'Download not found' });
            }
            res.status(200).json(download);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Eliminar descarga
    router.delete('/downloads/:id', async (req, res) => {
        try {
            const success = await downloadController.deleteDownload(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Download not found' });
            }
            res.status(200).json({ message: 'Download deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}; 