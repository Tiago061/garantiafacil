import {openDB} from 'idb';import type {Product,Settings} from './types';
export const db=openDB('garantia-facil',2,{upgrade(db,old){if(old<1){db.createObjectStore('products',{keyPath:'id'});db.createObjectStore('settings')}if(old<2)db.createObjectStore('meta')}});
export async function all(){return (await db).getAll('products') as Promise<Product[]>}
export async function save(p:Product){await(await db).put('products',p)}
export async function remove(id:string){await(await db).delete('products',id)}
export async function settings(s?:Settings){const d=await db;if(s)await d.put('settings',s,'preferences');return d.get('settings','preferences')}
export async function mergeProducts(items:Product[]){const d=await db;const tx=d.transaction('products','readwrite');for(const p of items){const old=await tx.store.get(p.id);if(!old||p.updatedAt>old.updatedAt)await tx.store.put(p)}await tx.done}
