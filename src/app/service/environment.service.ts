import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, startWith, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiServerConfig } from "../model/environment.model";
import { AssertapiClientService } from "./assertapi-client.service";

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService extends AssertapiClientService {

    private _environments: BehaviorSubject<Array<ApiServerConfig>> = new BehaviorSubject([]);
    public readonly environments: Observable<Array<ApiServerConfig>> = this._environments.asObservable();

    getEnvironments(): Observable<void> {
        this._environments.next([]);
        let url: string = `${environment.server}/v1/modelization/environment`;
        return this.get(url).pipe(
            tap(e => this._environments.next(e)),
            map((_) => {})
        );
    }

    putEnvironment(apiServerConfig: ApiServerConfig): Observable<void> {
        let url: string = `${environment.server}/v1/modelization/environment`;
        return this.put(url, apiServerConfig).pipe(
            tap(id => {
                apiServerConfig.id = id;
                var envs = this._environments.value;
                envs.push(apiServerConfig);
                this._environments.next(envs);
            }),
            map((_) => {})
        );
    }

    updateEnvironment(apiServerConfig: ApiServerConfig): Observable<void> {
        let url: string = `${environment.server}/v1/modelization/environment`;
        return this.post(url, apiServerConfig).pipe(
            tap(() => {
                var envs = this._environments.value;
                var index = envs.findIndex(d => d.id == apiServerConfig.id);
                envs.splice(index, 1, apiServerConfig);
                this._environments.next(envs);
            })
        );
    }

    deleteEnvironment(ids: number[]): Observable<void> {
        let url: string = `${environment.server}/v1/modelization/environment`;
        return this.delete(url, { 'id': ids.map(id => id.toString()) }).pipe(
            tap(() => {
                var envs = this._environments.value;
                ids.forEach(id => {
                    var index = envs.findIndex(d => d.id == id);
                    envs.splice(index, 1);
                })
                this._environments.next(envs);
            })
        );
    }
}