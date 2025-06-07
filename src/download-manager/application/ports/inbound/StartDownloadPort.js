/**
 * @interface StartDownloadPort
 * Define el contrato para iniciar descargas
 */
class StartDownloadPort {
    /**
     * Inicia una nueva descarga
     * @param {Object} params - Parámetros de la descarga
     * @param {string} params.userId - ID del usuario
     * @param {string} params.contentId - ID del contenido
     * @param {string} params.quality - Calidad de la descarga
     * @returns {Promise<Object>} La descarga iniciada
     */
    async execute(params) {
        throw new Error('Method not implemented');
    }
}

module.exports = StartDownloadPort; 