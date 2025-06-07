class DownloadRepository {
    async save(download) {
        throw new Error('Method not implemented');
    }

    async findById(id) {
        throw new Error('Method not implemented');
    }

    async findByUserId(userId) {
        throw new Error('Method not implemented');
    }

    async findByContentId(contentId) {
        throw new Error('Method not implemented');
    }

    async update(id, download) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }

    async findExpiredDownloads() {
        throw new Error('Method not implemented');
    }
}

module.exports = DownloadRepository; 