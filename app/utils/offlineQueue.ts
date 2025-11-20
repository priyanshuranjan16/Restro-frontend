import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface QueuedOrder {
  id: string;
  payload: any;
  timestamp: number;
  retries: number;
  idempotencyToken: string;
}

interface POSDB extends DBSchema {
  orders: {
    key: string;
    value: QueuedOrder;
  };
}

let db: IDBPDatabase<POSDB> | null = null;

export async function initOfflineQueue() {
  if (typeof window === 'undefined') return;
  
  db = await openDB<POSDB>('pos-offline-queue', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'id' });
      }
    },
  });
}

export async function queueOrder(orderPayload: any): Promise<string> {
  if (!db) await initOfflineQueue();
  if (!db) throw new Error('IndexedDB not available');

  const idempotencyToken = `token-${Date.now()}-${Math.random()}`;
  const queuedOrder: QueuedOrder = {
    id: idempotencyToken,
    payload: orderPayload,
    timestamp: Date.now(),
    retries: 0,
    idempotencyToken,
  };

  await db.put('orders', queuedOrder);
  return idempotencyToken;
}

export async function getQueuedOrders(): Promise<QueuedOrder[]> {
  if (!db) await initOfflineQueue();
  if (!db) return [];
  
  return await db.getAll('orders');
}

export async function removeQueuedOrder(id: string) {
  if (!db) await initOfflineQueue();
  if (!db) return;
  
  await db.delete('orders', id);
}

export async function incrementRetry(id: string) {
  if (!db) await initOfflineQueue();
  if (!db) return;
  
  const order = await db.get('orders', id);
  if (order) {
    order.retries += 1;
    await db.put('orders', order);
  }
}

