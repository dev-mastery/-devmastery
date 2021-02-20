import { OperationalError } from "./operational-error";
interface Logger {
    debug(info: object): void;
    warn(info: object): void;
    error(info: object): void;
}
export declare function makeHandleError({ logger }: {
    logger: Logger;
}): (error: Error | OperationalError) => void;
export {};
