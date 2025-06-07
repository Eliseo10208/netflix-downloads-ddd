/**
 * @interface ContentServicePort
 * Define el contrato para el servicio de contenido
 */
class ContentServicePort {
    /**
     * Verifica la disponibilidad del contenido para descarga
     * @param {string} contentId - ID del contenido
     * @param {string} quality - Calidad solicitada
     * @returns {Promise<Object>} Información del contenido
     */
    async verifyContentAvailability(contentId, quality) {
        throw new Error('Method not implemented');
    }

    /**
     * Obtiene los metadatos del contenido
     * @param {string} contentId - ID del contenido
     * @returns {Promise<Object>} Metadatos del contenido
     */
    async getContentMetadata(contentId) {
        throw new Error('Method not implemented');
    }
}

module.exports = ContentServicePort; 