import { ApiServerConfig } from "./environment.model";
import { ApiRequest } from "./request.model";

export class RequestExecution {
    host: string;
    start: number;
    end: number;
}

export class AssertionResult {
    id: number;
    expExecution: RequestExecution;
    actExecution: RequestExecution;
    status: string;
    step: string;
}

export class AssertionResultServer {
    result: AssertionResult;
    request: ApiRequest;
}

export class AssertionContext {
    user: string;
    os: string;
    address: string;
}

export class ApiTrace {
    requestId: number;
    requestName: string;
    requestDescription: string;
    requestMethod: string;
    requestUri: string;
    requestHeaders: { [key: string]: string };
    requestBody: string;
    assertionStatus: CompareStatus;
}

export class ApiTraceGroup {
    id: number;
    user: string;
    os: string;
    address: string;
    app: string;
    actualEnv: string;
    expectedEnv: string;
    status: string;
    nbTest: number;
    nbTestOk: number;
    nbTestKo: number;
    nbTestSkip: number;
}

export class ResponseComparator {
    exp: ApiResponseServer;
    act: ApiResponseServer;
    status: string;
    step: string;
}

export class ApiResponseServer {
    statusCode: number;
    contentType: string;
    response: string;
}

export class ComparatorData {
    apiTrace: ApiTrace;
    responseComparator: ResponseComparator;
}

export class Data {
    tableElements: Array<AssertionResultServer>;
    environments: Array<ApiServerConfig>;
}

export enum CompareStatus {
    SKIP, ERROR, FAIL, OK
}