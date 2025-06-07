const DownloadStatus = require('../value-objects/DownloadStatus');
const Quality = require('../value-objects/Quality');

class DownloadService {
    constructor() {
        this.MAX_DISK_SPACE = 100 * 1024 * 1024 * 1024; // 100GB
        this.DEFAULT_EXPIRATION_DAYS = 7;
    }

    /**
     * Valida si hay espacio suficiente en disco para la descarga
     * @param {number} requiredSpace - Espacio requerido en bytes
     * @param {number} currentUsedSpace - Espacio actualmente usado en bytes
     * @returns {boolean}
     */
    validateDiskSpace(requiredSpace, currentUsedSpace) {
        return (currentUsedSpace + requiredSpace) <= this.MAX_DISK_SPACE;
    }

    /**
     * Calcula la fecha de expiración para una descarga
     * @param {number} days - Días de validez
     * @returns {Date}
     */
    calculateExpirationDate(days = this.DEFAULT_EXPIRATION_DAYS) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        return expirationDate;
    }

    /**
     * Valida si una descarga puede ser iniciada
     * @param {Object} download - La descarga a validar
     * @param {number} currentUsedSpace - Espacio actualmente usado
     * @returns {boolean}
     */
    canStartDownload(download, currentUsedSpace) {
        return (
            download.status.equals(DownloadStatus.PENDING) &&
            this.validateDiskSpace(download.size, currentUsedSpace)
        );
    }

    /**
     * Calcula el tamaño estimado basado en la calidad
     * @param {Quality} quality - La calidad de la descarga
     * @returns {number} Tamaño estimado en bytes
     */
    estimateSizeByQuality(quality) {
        const sizeMap = {
            '480p': 500 * 1024 * 1024,  // 500MB
            '720p': 1.5 * 1024 * 1024 * 1024,  // 1.5GB
            '1080p': 3 * 1024 * 1024 * 1024  // 3GB
        };
        return sizeMap[quality.toString()] || 0;
    }

    /**
     * Verifica si una descarga ha expirado
     * @param {Date} expiresAt - Fecha de expiración
     * @returns {boolean}
     */
    isExpired(expiresAt) {
        return new Date() > expiresAt;
    }
}

module.exports = DownloadService; 