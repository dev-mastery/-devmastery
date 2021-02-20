export declare class OperationalError extends Error {
    #private;
    constructor({ context, message, severity, }?: {
        context?: ErrorContext;
        message?: string;
        severity?: ErrorSeverity;
    });
    static isOperationalError(error: Error): error is OperationalError;
    get severity(): ErrorSeverity;
    get context(): ErrorContext;
    get name(): string;
    toPlainObject(): Readonly<{
        context: ErrorContext;
        message: string;
        name: string;
        severity: ErrorSeverity;
    }>;
}
declare type ErrorContext = {
    [key: string]: any;
};
declare type ErrorSeverity = "High" | "Medium" | "Low";
export {};
