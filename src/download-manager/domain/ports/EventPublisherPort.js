/**
 * @interface EventPublisherPort
 * Define el contrato para el publicador de eventos
 */
class EventPublisherPort {
    /**
     * Publica un evento en el sistema
     * @param {string} eventName - El nombre del evento
     * @param {Object} payload - Los datos del evento
     * @returns {Promise<void>}
     */
    async publish(eventName, payload) {
        throw new Error('Method not implemented');
    }
}

module.exports = EventPublisherPort; 