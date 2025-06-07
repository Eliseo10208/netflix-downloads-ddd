const Download = require('../../domain/entities/Download');
const DownloadStatus = require('../../domain/value-objects/DownloadStatus');
const Quality = require('../../domain/value-objects/Quality');
const DownloadService = require('../../domain/services/DownloadService');

class StartDownloadUseCase {
    constructor(downloadRepository, contentService, eventPublisher) {
        this.downloadRepository = downloadRepository;
        this.contentService = contentService;
        this.eventPublisher = eventPublisher;
        this.downloadService = new DownloadService();
    }

    async execute({ userId, contentId, quality }) {
        try {
            // Verificar disponibilidad del contenido
            const contentInfo = await this.contentService.verifyContentAvailability(contentId, quality);

            // Crear nueva descarga
            const download = new Download({
                userId,
                contentId,
                quality: new Quality(quality),
                status: DownloadStatus.PENDING,
                size: contentInfo.size,
                progress: 0,
                expiresAt: this.downloadService.calculateExpirationDate()
            });

            // Guardar la descarga
            const savedDownload = await this.downloadRepository.save(download);

            // Publicar evento de descarga iniciada
            await this.eventPublisher.publishDownloadStarted(savedDownload);

            return savedDownload;
        } catch (error) {
            throw new Error(`Failed to start download: ${error.message}`);
        }
    }
}

module.exports = StartDownloadUseCase; 