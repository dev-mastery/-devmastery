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
    get context(): string | null;
    get name(): string;
    get mergeFields(): MergeFields;
    toPlainObject(): Readonly<PlainError>;
}
declare type MergeFields = {
    [key: string]: {
        toString(): string;
    };
};
declare type ErrorSeverity = "High" | "Medium" | "Low";
interface PlainError {
    severity: ErrorSeverity;
    context: string;
    name: string;
    message: string;
    mergeFields: MergeFields;
}
export {};
