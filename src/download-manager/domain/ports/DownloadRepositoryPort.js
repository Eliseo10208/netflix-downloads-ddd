/**
 * @interface DownloadRepositoryPort
 * Define el contrato para el repositorio de descargas
 */
class DownloadRepositoryPort {
    /**
     * Guarda una nueva descarga
     * @param {Download} download - La entidad de descarga a guardar
     * @returns {Promise<Download>} La descarga guardada
     */
    async save(download) {
        throw new Error('Method not implemented');
    }

    /**
     * Busca una descarga por su ID
     * @param {string} id - El ID de la descarga
     * @returns {Promise<Download|null>} La descarga encontrada o null
     */
    async findById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * Busca todas las descargas de un usuario
     * @param {string} userId - El ID del usuario
     * @returns {Promise<Download[]>} Lista de descargas del usuario
     */
    async findByUserId(userId) {
        throw new Error('Method not implemented');
    }

    /**
     * Busca una descarga específica de un usuario
     * @param {string} userId - El ID del usuario
     * @param {string} contentId - El ID del contenido
     * @returns {Promise<Download|null>} La descarga encontrada o null
     */
    async findByUserIdAndContentId(userId, contentId) {
        throw new Error('Method not implemented');
    }
}

module.exports = DownloadRepositoryPort; 