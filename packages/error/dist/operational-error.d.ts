export declare class OperationalError extends Error {
    #private;
    constructor({ context, mergeFields, message, severity, }?: {
        context?: string;
        mergeFields?: MergeFields;
        message?: string;
        severity?: ErrorSeverity;
    });
    static isOperationalError(error: Error): error is OperationalError;
    get severity(): ErrorSeverity;
    get context(): string;
    get name(): string;
    get mergeFields(): MergeFields;
    toPlainObject(): Readonly<{
        context: string;
        mergeFields: MergeFields;
        message: string;
        name: string;
        severity: ErrorSeverity;
    }>;
}
declare type MergeFields = {
    [key: string]: {
        toString(): string;
    };
};
declare type ErrorSeverity = "High" | "Medium" | "Low";
export {};
