class Download {
    constructor({
        id,
        userId,
        contentId,
        status,
        progress,
        quality,
        size,
        createdAt,
        updatedAt,
        expiresAt
    }) {
        this.id = id;
        this.userId = userId;
        this.contentId = contentId;
        this.status = status; // PENDING, DOWNLOADING, COMPLETED, FAILED, EXPIRED
        this.progress = progress; // 0-100
        this.quality = quality; // 480p, 720p, 1080p
        this.size = size; // en bytes
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
        this.expiresAt = expiresAt;
    }

    isExpired() {
        return this.expiresAt && new Date() > this.expiresAt;
    }

    isDownloadable() {
        return this.status === 'PENDING' || this.status === 'FAILED';
    }

    updateProgress(progress) {
        this.progress = progress;
        this.updatedAt = new Date();
        if (progress === 100) {
            this.status = 'COMPLETED';
        }
    }

    markAsFailed() {
        this.status = 'FAILED';
        this.updatedAt = new Date();
    }

    markAsExpired() {
        this.status = 'EXPIRED';
        this.updatedAt = new Date();
    }
}

module.exports = Download; 