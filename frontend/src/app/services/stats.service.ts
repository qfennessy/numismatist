import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private url = '/api/stats';

  constructor(private http: HttpClient) {}

  getValue(): Observable<{ totalValue: number; byMetal: Record<string, number> }> {
    return this.http.get<{ totalValue: number; byMetal: Record<string, number> }>(`${this.url}/value`);
  }

  getComposition(): Observable<{ totalCount: number; breakdown: Record<string, number> }> {
    return this.http.get<{ totalCount: number; breakdown: Record<string, number> }>(`${this.url}/composition`);
  }

  getTimeline(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/timeline`);
  }
}
