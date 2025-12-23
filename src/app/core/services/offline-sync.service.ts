import { Injectable, inject, OnDestroy } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { fromEvent, merge, Subscription, firstValueFrom } from 'rxjs';

interface PendingAction {
  id?: number;
  type: 'create' | 'update' | 'delete';
  data: unknown;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class OfflineSyncService implements OnDestroy {
  private indexedDB = inject(IndexedDBService);
  private transactionRepo = inject(ITransactionRepository);
  private isOnline = navigator.onLine;
  private subscription?: Subscription;

  constructor() {
    this.initializeOnlineListener();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private initializeOnlineListener(): void {
    this.subscription = merge(
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).subscribe(() => {
      this.isOnline = navigator.onLine;
      if (this.isOnline) {
        this.syncPendingActions().catch(error => {
          console.error('Sync failed:', error);
        });
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
    try {
      const actions = await this.indexedDB.getAll<PendingAction>('pendingActions');
      
      const syncPromises = actions.map(async (action) => {
        try {
          switch (action.type) {
            case 'create':
              await firstValueFrom(this.transactionRepo.create(action.data));
              break;
            case 'update':
              await firstValueFrom(this.transactionRepo.update((action.data as any).id, action.data));
              break;
            case 'delete':
              await firstValueFrom(this.transactionRepo.delete((action.data as any).id));
              break;
          }
          
          if (action.id) {
            await this.indexedDB.delete('pendingActions', action.id);
          }
        } catch (error) {
          console.error(`Failed to sync action ${action.type}:`, error);
          // Keep failed actions for retry
        }
      });
      
      await Promise.allSettled(syncPromises);
    } catch (error) {
      console.error('Sync process failed:', error);
      throw error;
    }
  }

  async cacheTransactions(transactions: any[]): Promise<void> {
    const cachePromises = transactions.map(transaction => 
      this.indexedDB.set('transactions', transaction)
    );
    await Promise.all(cachePromises);
  }

  async getCachedTransactions(): Promise<any[]> {
    return await this.indexedDB.getAll('transactions');
  }

  getOnlineStatus(): boolean {
    return this.isOnline;
  }
}
