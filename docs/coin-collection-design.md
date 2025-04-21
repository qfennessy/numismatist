# Numismatist - Coin Collection API Design

## Overview
This document outlines the Angular service design for managing a collection of rare ancient Roman and Greek coins, following REST principles and Angular best practices.

## Data Models

### Coin
```typescript
export interface Coin {
  id: string;
  name: string;
  origin: 'Roman' | 'Greek' | 'Other';
  period: string;
  year: number | null;
  metal: 'Gold' | 'Silver' | 'Bronze' | 'Copper' | 'Other';
  denomination: string;
  emperor?: string;
  description: string;
  condition: 'Mint' | 'Fine' | 'Very Fine' | 'Extremely Fine' | 'Good' | 'Fair' | 'Poor';
  diameter: number;
  weight: number;
  obverseDescription: string;
  reverseDescription: string;
  acquisitionDate: Date;
  acquisitionPrice: number;
  estimatedValue: number;
  images: CoinImage[];
  tags: string[];
  notes: string;
  isPublic: boolean;
}

export interface CoinImage {
  id: string;
  url: string;
  side: 'Obverse' | 'Reverse' | 'Edge' | 'Full';
  isPrimary: boolean;
}
```

## Angular Services

### CoinService
```typescript
@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private apiUrl = 'api/coins';

  constructor(private http: HttpClient) {}

  // Get all coins (with optional filtering)
  getCoins(filter?: CoinFilter): Observable<Coin[]> {
    const params = new HttpParams({ fromObject: { ...filter } });
    return this.http.get<Coin[]>(this.apiUrl, { params });
  }

  // Get a specific coin by ID
  getCoin(id: string): Observable<Coin> {
    return this.http.get<Coin>(`${this.apiUrl}/${id}`);
  }

  // Create a new coin
  createCoin(coin: Omit<Coin, 'id'>): Observable<Coin> {
    return this.http.post<Coin>(this.apiUrl, coin);
  }

  // Update an existing coin
  updateCoin(id: string, coin: Partial<Coin>): Observable<Coin> {
    return this.http.put<Coin>(`${this.apiUrl}/${id}`, coin);
  }

  // Delete a coin
  deleteCoin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Upload coin images
  uploadCoinImages(coinId: string, files: File[]): Observable<CoinImage[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    
    return this.http.post<CoinImage[]>(`${this.apiUrl}/${coinId}/images`, formData);
  }

  // Delete coin image
  deleteImage(coinId: string, imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${coinId}/images/${imageId}`);
  }
}
```

### CoinStatsService
```typescript
@Injectable({
  providedIn: 'root'
})
export class CoinStatsService {
  private apiUrl = 'api/coins/stats';

  constructor(private http: HttpClient) {}

  // Get collection value statistics
  getValueStats(): Observable<CollectionValueStats> {
    return this.http.get<CollectionValueStats>(`${this.apiUrl}/value`);
  }

  // Get collection composition statistics
  getCompositionStats(): Observable<CollectionCompositionStats> {
    return this.http.get<CollectionCompositionStats>(`${this.apiUrl}/composition`);
  }

  // Get acquisition timeline
  getAcquisitionTimeline(): Observable<AcquisitionTimelineEntry[]> {
    return this.http.get<AcquisitionTimelineEntry[]>(`${this.apiUrl}/timeline`);
  }
}
```

## Error Handling

```typescript
// Global HTTP error interceptor
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        this.messageService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
```

## Usage Example

```typescript
@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html'
})
export class CoinListComponent implements OnInit {
  coins: Coin[] = [];
  loading = false;
  error: string | null = null;

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins(filter?: CoinFilter): void {
    this.loading = true;
    this.coinService.getCoins(filter).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (coins) => this.coins = coins,
      error: (err) => this.error = 'Failed to load coins'
    });
  }
}
```

## Best Practices
1. All API calls return Observables for reactive programming
2. Type safety with TypeScript interfaces
3. Separation of concerns with dedicated services
4. Centralized error handling
5. Proper HTTP verb usage (GET, POST, PUT, DELETE)
6. Query parameter support for filtering
7. Reactive state management
8. Optimistic UI updates
9. Loading/error state handling