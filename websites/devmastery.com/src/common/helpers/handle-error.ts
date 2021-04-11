import { makeHandleError } from "@devmastery/error";

const handleError = makeHandleError({ logger: console });

export { handleError };
