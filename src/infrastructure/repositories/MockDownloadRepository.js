const DownloadRepositoryPort = require('../../download-manager/application/ports/outbound/DownloadRepositoryPort');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

class MockDownloadRepository extends DownloadRepositoryPort {
    constructor() {
        super();
        this.dataFile = path.join(__dirname, '../data/downloads.json');
        this.downloads = new Map();
        this.loadData();
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.dataFile, 'utf8');
            const { downloads } = JSON.parse(data);
            downloads.forEach(download => {
                this.downloads.set(download.id, download);
            });
        } catch (error) {
            console.error('Error loading downloads data:', error);
            this.downloads = new Map();
        }
    }

    async saveData() {
        try {
            const data = {
                downloads: Array.from(this.downloads.values())
            };
            await fs.writeFile(this.dataFile, JSON.stringify(data, null, 4));
        } catch (error) {
            console.error('Error saving downloads data:', error);
        }
    }

    async save(download) {
        const id = uuidv4();
        const downloadWithId = {
            ...download,
            id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.downloads.set(id, downloadWithId);
        await this.saveData();
        return downloadWithId;
    }

    async findById(id) {
        return this.downloads.get(id) || null;
    }

    async findByUserId(userId) {
        return Array.from(this.downloads.values())
            .filter(download => download.userId === userId);
    }

    async findByContentId(contentId) {
        return Array.from(this.downloads.values())
            .filter(download => download.contentId === contentId);
    }

    async findByUserIdAndContentId(userId, contentId) {
        return Array.from(this.downloads.values())
            .find(download => 
                download.userId === userId && 
                download.contentId === contentId
            ) || null;
    }

    async update(id, download) {
        if (!this.downloads.has(id)) {
            return null;
        }
        const updatedDownload = {
            ...this.downloads.get(id),
            ...download,
            id,
            updatedAt: new Date()
        };
        this.downloads.set(id, updatedDownload);
        await this.saveData();
        return updatedDownload;
    }

    async delete(id) {
        const result = this.downloads.delete(id);
        if (result) {
            await this.saveData();
        }
        return result;
    }

    async findExpiredDownloads() {
        const now = new Date();
        return Array.from(this.downloads.values())
            .filter(download => new Date(download.expiresAt) < now && download.status !== 'EXPIRED');
    }
}

module.exports = MockDownloadRepository; 