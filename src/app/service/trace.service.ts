import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiTraceGroup, ApiTrace } from "../model/trace.model";
import { AssertapiClientService } from "./assertapi-client.service";

@Injectable({
    providedIn: 'root'
})
export class TraceService extends AssertapiClientService {
    getTraces(id?: number, status?: string[]): Observable<Array<ApiTrace>> {
        let url: string = `${environment.server}/v1/non_regression/trace`;
        return this.get(url, { 'id': [id?.toString()], 'status': status });
    }

    getTraceGroups(id?: number): Observable<Array<ApiTraceGroup>> {
        let url: string = `${environment.server}/v1/non_regression/trace/group`;
        return this.get(url, { 'asrID': id?.toString() });
    }

    getTraceGroup(id: number): Observable<ApiTraceGroup> {
        return this.getTraceGroups(id).pipe(
            map(res => res[0])
        );
    }

    register(app: string, actualEnv: string, expectedEnv: string): Observable<number> {
        let url: string = `${environment.server}/v1/assert/api/trace/register`;
        return this.get(url, { 'app': app, 'actual_env': actualEnv, 'expected_env': expectedEnv });
    }
}