class DownloadController {
    constructor(startDownloadUseCase, downloadRepository) {
        this.startDownloadUseCase = startDownloadUseCase;
        this.downloadRepository = downloadRepository;
    }

    async startDownload(downloadData) {
        return this.startDownloadUseCase.execute(downloadData);
    }

    async getDownloadById(id) {
        return this.downloadRepository.findById(id);
    }

    async getDownloadsByUserId(userId) {
        return this.downloadRepository.findByUserId(userId);
    }

    async updateDownloadProgress(id, progress) {
        const download = await this.downloadRepository.findById(id);
        if (!download) {
            return null;
        }

        const updatedDownload = {
            ...download,
            progress,
            status: progress === 100 ? { value: 'COMPLETED' } : { value: 'IN_PROGRESS' }
        };

        return this.downloadRepository.update(id, updatedDownload);
    }

    async cancelDownload(id) {
        const download = await this.downloadRepository.findById(id);
        if (!download) {
            return null;
        }

        const updatedDownload = {
            ...download,
            status: { value: 'CANCELLED' }
        };

        return this.downloadRepository.update(id, updatedDownload);
    }

    async deleteDownload(id) {
        return this.downloadRepository.delete(id);
    }
}

module.exports = DownloadController; 