/**
 * @interface DownloadRepositoryPort
 * Define el contrato para el repositorio de descargas
 */
class DownloadRepositoryPort {
    /**
     * Guarda una nueva descarga
     * @param {Object} download - La entidad de descarga a guardar
     * @returns {Promise<Object>} La descarga guardada
     */
    async save(download) {
        throw new Error('Method not implemented');
    }

    /**
     * Busca una descarga por su ID
     * @param {string} id - El ID de la descarga
     * @returns {Promise<Object|null>} La descarga encontrada o null
     */
    async findById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * Busca todas las descargas de un usuario
     * @param {string} userId - El ID del usuario
     * @returns {Promise<Object[]>} Lista de descargas del usuario
     */
    async findByUserId(userId) {
        throw new Error('Method not implemented');
    }

    /**
     * Busca una descarga específica de un usuario
     * @param {string} userId - El ID del usuario
     * @param {string} contentId - El ID del contenido
     * @returns {Promise<Object|null>} La descarga encontrada o null
     */
    async findByUserIdAndContentId(userId, contentId) {
        throw new Error('Method not implemented');
    }

    /**
     * Actualiza una descarga existente
     * @param {string} id - El ID de la descarga
     * @param {Object} download - Los datos actualizados
     * @returns {Promise<Object|null>} La descarga actualizada o null
     */
    async update(id, download) {
        throw new Error('Method not implemented');
    }

    /**
     * Elimina una descarga
     * @param {string} id - El ID de la descarga
     * @returns {Promise<boolean>} true si se eliminó correctamente
     */
    async delete(id) {
        throw new Error('Method not implemented');
    }
}

module.exports = DownloadRepositoryPort; 