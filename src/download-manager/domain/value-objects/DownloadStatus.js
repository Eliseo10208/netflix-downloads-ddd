class DownloadStatus {
    static PENDING = new DownloadStatus('PENDING');
    static DOWNLOADING = new DownloadStatus('DOWNLOADING');
    static COMPLETED = new DownloadStatus('COMPLETED');
    static FAILED = new DownloadStatus('FAILED');
    static EXPIRED = new DownloadStatus('EXPIRED');

    static VALID_STATUSES = [
        DownloadStatus.PENDING,
        DownloadStatus.DOWNLOADING,
        DownloadStatus.COMPLETED,
        DownloadStatus.FAILED,
        DownloadStatus.EXPIRED
    ];

    constructor(value) {
        this.value = value;
    }

    toString() {
        return this.value;
    }

    equals(other) {
        return other instanceof DownloadStatus && this.value === other.value;
    }

    static fromString(value) {
        const status = DownloadStatus.VALID_STATUSES.find(s => s.value === value);
        if (!status) {
            throw new Error(`Invalid status: ${value}`);
        }
        return status;
    }
}

module.exports = DownloadStatus; 