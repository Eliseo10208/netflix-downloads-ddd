/**
 * @interface ContentServicePort
 * Define el contrato para el servicio de contenido
 */
class ContentServicePort {
    /**
     * Verifica si el contenido está disponible para descarga
     * @param {string} contentId - El ID del contenido
     * @param {string} quality - La calidad solicitada
     * @returns {Promise<boolean>} true si el contenido está disponible
     */
    async isContentAvailableForDownload(contentId, quality) {
        throw new Error('Method not implemented');
    }

    /**
     * Obtiene el tamaño del contenido
     * @param {string} contentId - El ID del contenido
     * @param {string} quality - La calidad solicitada
     * @returns {Promise<number>} El tamaño en bytes
     */
    async getContentSize(contentId, quality) {
        throw new Error('Method not implemented');
    }
}

module.exports = ContentServicePort; 