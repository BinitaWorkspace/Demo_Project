import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG'
}

export class Logger {
    private static instance: Logger;
    private logFilePath: string;

    private constructor() {
        this.logFilePath = './test-results/test-run.log';
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Log a message with timestamp and level
     * @param level - Log level (INFO, WARN, ERROR, DEBUG)
     * @param message - Message to log
     */
    public log(level: LogLevel, message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${level}] ${timestamp} - ${message}\n`;

        try {
            const dir = path.dirname(this.logFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.appendFileSync(this.logFilePath, logMessage, 'utf8');
        } catch (error) {
            console.error(`Logger error: Failed to write log - ${error}`);
        }
    }
}
