/**
 * @interface EventPublisherPort
 * Define el contrato para el publicador de eventos
 */
class EventPublisherPort {
    /**
     * Publica un evento
     * @param {string} eventType - Tipo de evento
     * @param {Object} eventData - Datos del evento
     * @returns {Promise<void>}
     */
    async publish(eventType, eventData) {
        throw new Error('Method not implemented');
    }
}

module.exports = EventPublisherPort; 