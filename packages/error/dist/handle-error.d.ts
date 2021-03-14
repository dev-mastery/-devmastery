import { OperationalError } from "./operational-error";
interface Logger {
    debug(info: Record<string, unknown>): void;
    warn(info: Record<string, unknown>): void;
    error(info: Record<string, unknown>): void;
}
export declare function makeHandleError({ logger }: {
    logger: Logger;
}): (error: Error | OperationalError) => void;
export {};
