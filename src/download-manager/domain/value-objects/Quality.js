class Quality {
    static VALID_QUALITIES = ['480p', '720p', '1080p'];

    constructor(value) {
        if (!Quality.VALID_QUALITIES.includes(value)) {
            throw new Error(`Invalid quality: ${value}. Must be one of ${Quality.VALID_QUALITIES.join(', ')}`);
        }
        this.value = value;
    }

    toString() {
        return this.value;
    }

    equals(other) {
        return other instanceof Quality && this.value === other.value;
    }

    static fromString(value) {
        return new Quality(value);
    }
}

module.exports = Quality; 