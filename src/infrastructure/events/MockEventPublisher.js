const EventPublisherPort = require('../../download-manager/application/ports/outbound/EventPublisherPort');

class MockEventPublisher extends EventPublisherPort {
    constructor() {
        super();
        this.events = [];
    }

    async publish(eventType, eventData) {
        const event = {
            type: eventType,
            data: eventData,
            timestamp: new Date()
        };
        
        this.events.push(event);
        console.log('Event published:', event);
        
        return Promise.resolve();
    }

    getEvents() {
        return this.events;
    }

    clearEvents() {
        this.events = [];
    }
}

module.exports = MockEventPublisher; 