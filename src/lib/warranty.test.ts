import {test} from 'node:test';import assert from 'node:assert/strict';import {expiry,daysLeft} from './warranty';
test('fim de mês e ano bissexto',()=>{assert.equal(expiry('2024-01-31',1),'2024-02-29');assert.equal(expiry('2024-02-29',12),'2025-02-28');assert.equal(expiry('2025-12-31',2),'2026-02-28')});
test('data manual tem prioridade',()=>assert.equal(expiry('2025-01-01',12,'2027-04-01'),'2027-04-01'));
test('dias de calendário, vencimento hoje e expiradas',()=>{assert.equal(daysLeft('2026-03-09','2026-03-07'),2);assert.equal(daysLeft('2026-11-01','2026-11-01'),0);assert.equal(daysLeft('2026-10-31','2026-11-01'),-1)});
