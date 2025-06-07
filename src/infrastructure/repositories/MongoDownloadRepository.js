const mongoose = require('mongoose');
const DownloadRepository = require('../../download-manager/domain/repositories/DownloadRepository');

const downloadSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    contentId: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['PENDING', 'DOWNLOADING', 'COMPLETED', 'FAILED', 'EXPIRED'],
        default: 'PENDING'
    },
    progress: { type: Number, default: 0 },
    quality: { type: String, required: true },
    size: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});

const DownloadModel = mongoose.model('Download', downloadSchema);

class MongoDownloadRepository extends DownloadRepository {
    async save(download) {
        const downloadDoc = new DownloadModel(download);
        await downloadDoc.save();
        return downloadDoc;
    }

    async findById(id) {
        return await DownloadModel.findById(id);
    }

    async findByUserId(userId) {
        return await DownloadModel.find({ userId });
    }

    async findByContentId(contentId) {
        return await DownloadModel.find({ contentId });
    }

    async findByUserIdAndContentId(userId, contentId) {
        return await DownloadModel.findOne({ userId, contentId });
    }

    async update(id, download) {
        return await DownloadModel.findByIdAndUpdate(id, download, { new: true });
    }

    async delete(id) {
        return await DownloadModel.findByIdAndDelete(id);
    }

    async findExpiredDownloads() {
        return await DownloadModel.find({
            expiresAt: { $lt: new Date() },
            status: { $ne: 'EXPIRED' }
        });
    }
}

module.exports = MongoDownloadRepository; 