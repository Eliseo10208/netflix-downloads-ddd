const MockDownloadRepository = require('./repositories/MockDownloadRepository');
const MockContentService = require('./services/MockContentService');
const MockEventPublisher = require('./events/MockEventPublisher');
const DownloadEventPublisher = require('../download-manager/interfaces/events/DownloadEventPublisher');
const StartDownloadUseCase = require('../download-manager/application/use-cases/StartDownloadUseCase');
const DownloadController = require('../download-manager/interfaces/http/controllers/DownloadController');

class Container {
    constructor() {
        // Infraestructura
        this.downloadRepository = new MockDownloadRepository();
        this.contentService = new MockContentService();
        this.eventPublisher = new MockEventPublisher();

        // Interfaces
        this.downloadEventPublisher = new DownloadEventPublisher(this.eventPublisher);

        // Casos de uso
        this.startDownloadUseCase = new StartDownloadUseCase(
            this.downloadRepository,
            this.contentService,
            this.downloadEventPublisher
        );

        // Controladores
        this.downloadController = new DownloadController(
            this.startDownloadUseCase,
            this.downloadRepository
        );
    }

    getDownloadController() {
        return this.downloadController;
    }
}

module.exports = Container; 