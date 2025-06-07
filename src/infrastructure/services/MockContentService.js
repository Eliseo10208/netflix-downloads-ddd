const ContentServicePort = require('../../download-manager/application/ports/outbound/ContentServicePort');

class MockContentService extends ContentServicePort {
    constructor() {
        super();
        // Datos de prueba
        this.availableContent = {
            'movie456': {
                id: 'movie456',
                title: 'The Matrix',
                availableQualities: ['480p', '720p', '1080p'],
                size: {
                    '480p': 500 * 1024 * 1024,    // 500MB
                    '720p': 1.5 * 1024 * 1024 * 1024,  // 1.5GB
                    '1080p': 3 * 1024 * 1024 * 1024    // 3GB
                }
            },
            'movie457': {
                id: 'movie457',
                title: 'Inception',
                availableQualities: ['480p', '720p', '1080p'],
                size: {
                    '480p': 600 * 1024 * 1024,    // 600MB
                    '720p': 1.8 * 1024 * 1024 * 1024,  // 1.8GB
                    '1080p': 3.5 * 1024 * 1024 * 1024  // 3.5GB
                }
            }
        };
    }

    async verifyContentAvailability(contentId, quality) {
        const content = this.availableContent[contentId];
        
        if (!content) {
            throw new Error('Content not found');
        }

        if (!content.availableQualities.includes(quality)) {
            throw new Error('Content is not available for download in the requested quality');
        }

        return {
            contentId: content.id,
            title: content.title,
            quality: quality,
            size: content.size[quality]
        };
    }

    async getContentMetadata(contentId) {
        const content = this.availableContent[contentId];
        
        if (!content) {
            throw new Error('Content not found');
        }

        return {
            id: content.id,
            title: content.title,
            availableQualities: content.availableQualities
        };
    }
}

module.exports = MockContentService; 