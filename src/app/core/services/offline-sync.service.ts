import { Injectable, inject } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { fromEvent, merge } from 'rxjs';

interface PendingAction {
  id?: number;
  type: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class OfflineSyncService {
  private indexedDB = inject(IndexedDBService);
  private transactionRepo = inject(ITransactionRepository);
  private isOnline = navigator.onLine;

  constructor() {
    this.initializeOnlineListener();
  }

  private initializeOnlineListener(): void {
    merge(
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).subscribe(() => {
      this.isOnline = navigator.onLine;
      if (this.isOnline) {
        this.syncPendingActions();
      }
    });
  }

  async queueAction(type: 'create' | 'update' | 'delete', data: any): Promise<void> {
    const action: PendingAction = {
      type,
      data,
      timestamp: Date.now()
    };
    
    await this.indexedDB.set('pendingActions', action);
    
    if (this.isOnline) {
      await this.syncPendingActions();
    }
  }

  async syncPendingActions(): Promise<void> {
    const actions = await this.indexedDB.getAll<PendingAction>('pendingActions');
    
    for (const action of actions) {
      try {
        switch (action.type) {
          case 'create':
            await this.transactionRepo.create(action.data).toPromise();
            break;
          case 'update':
            await this.transactionRepo.update(action.data.id, action.data).toPromise();
            break;
          case 'delete':
            await this.transactionRepo.delete(action.data.id).toPromise();
            break;
        }
        
        if (action.id) {
          await this.indexedDB.delete('pendingActions', action.id);
        }
      } catch (error) {
        console.error('Sync error:', error);
      }
    }
  }

  async cacheTransactions(transactions: any[]): Promise<void> {
    for (const transaction of transactions) {
      await this.indexedDB.set('transactions', transaction);
    }
  }

  async getCachedTransactions(): Promise<any[]> {
    return await this.indexedDB.getAll('transactions');
  }

  getOnlineStatus(): boolean {
    return this.isOnline;
  }
}
