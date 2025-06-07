const DownloadEvents = require('../../domain/events/DownloadEvents');
const EventPublisherPort = require('../../application/ports/outbound/EventPublisherPort');

class DownloadEventPublisher {
    constructor(eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    async publishDownloadStarted(download) {
        await this.eventPublisher.publish(DownloadEvents.DOWNLOAD_STARTED, {
            downloadId: download.id,
            userId: download.userId,
            contentId: download.contentId,
            quality: download.quality,
            size: download.size,
            timestamp: new Date()
        });
    }

    async publishDownloadCompleted(download) {
        await this.eventPublisher.publish(DownloadEvents.DOWNLOAD_COMPLETED, {
            downloadId: download.id,
            userId: download.userId,
            contentId: download.contentId,
            timestamp: new Date()
        });
    }

    async publishDownloadFailed(download, error) {
        await this.eventPublisher.publish(DownloadEvents.DOWNLOAD_FAILED, {
            downloadId: download.id,
            userId: download.userId,
            contentId: download.contentId,
            error: error.message,
            timestamp: new Date()
        });
    }

    async publishDownloadExpired(download) {
        await this.eventPublisher.publish(DownloadEvents.DOWNLOAD_EXPIRED, {
            downloadId: download.id,
            userId: download.userId,
            contentId: download.contentId,
            timestamp: new Date()
        });
    }
}

module.exports = DownloadEventPublisher; 