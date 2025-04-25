import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Coin } from '../models/coin.model';

@Injectable({ providedIn: 'root' })
export class CoinService extends BaseService<Coin> {
  constructor(http: HttpClient) {
    super(http, 'coins');
  }

  // Additional methods (e.g., search, pagination) can be added here
}
