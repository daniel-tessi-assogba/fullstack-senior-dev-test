import { Injectable, inject, signal } from "@angular/core";
import { Training_center } from "./training-center.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class TrainingCentersService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/trainin-centers";

    private readonly _training_centers = signal<Training_center[]>([]);

    public readonly training_centers = this._training_centers.asReadonly();

    public get(): Observable<Training_center[]> {
        return this.http.get<Training_center[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Training_center[]>("assets/training_centers.json");
            }),
            tap((training_centers: any) => this._training_centers.set(training_centers)),
        );
    }

    public create(training_center: Training_center): Observable<boolean> {
        return this.http.post<boolean>(this.path, training_center).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._training_centers.update((training_centers: any) => [training_centers, ...training_centers])),
        );
    }

    public update(training_center: Training_center): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${training_center.id}`, training_center).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._training_centers.update((training_centers: Training_center[]) => {
                return training_centers.map(p => p.id === training_center.id ? training_center : p)
            })),
        );
    }

    public delete(training_centerId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${training_centerId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._training_centers.update((training_centers: Training_center[]) => training_centers.filter(training_center => training_center.id !== training_centerId))),
        );
    }
}
