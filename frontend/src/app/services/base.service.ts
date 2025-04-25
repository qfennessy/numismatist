import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected url: string;

  constructor(protected http: HttpClient, baseEndpoint: string) {
    this.url = `/api/${baseEndpoint}`;
  }

  getAll(params?: { [key: string]: any }): Observable<T[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value != null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<T[]>(this.url, { params: httpParams });
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.url, item);
  }

  update(id: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
