'use strict';

const assert = require('node:assert/strict');
const { createOrderingCore } = require('../ordering-core.cjs');

const menu = [
  { id: 1, cat: 'main', zh: '起司蛋餅', ja: 'チーズ卵餅', en: 'Cheese Egg Pancake', ko: '치즈 계란 크레페', zhDesc: '含蛋與乳製品', jaDesc: '卵と乳製品', enDesc: 'Contains egg and dairy', koDesc: '달걀과 유제품 포함', price: 55 },
  { id: 2, cat: 'main', zh: '蘿蔔糕', ja: '大根もち', en: 'Turnip Cake', ko: '무떡', zhDesc: '示範主餐', jaDesc: 'デモ主食', enDesc: 'Demo main', koDesc: '데모 주식', price: 35 },
  { id: 3, cat: 'drink', zh: '紅茶', ja: '紅茶', en: 'Black Tea', ko: '홍차', zhDesc: '示範飲料', jaDesc: 'デモ飲料', enDesc: 'Demo drink', koDesc: '데모 음료', price: 15 }
];
const itemRules = {
  1: { allergens: ['egg', 'dairy', 'gluten'], vegetarian: true, vegan: false, addons: ['cheese'] },
  2: { allergens: ['gluten'], vegetarian: true, vegan: true },
  3: { allergens: [], vegetarian: true, vegan: true }
};
const optionPrices = { cheese: 5, large: 5 };
const addonRules = { cheese: { allergens: ['dairy'], vegetarian: true, vegan: false } };
const core = createOrderingCore({ menu, itemRules, optionPrices, addonRules, now: () => '2026-09-05T00:00:00.000Z' });

assert.equal(core.getMenu({ language: 'zh' }).items[0].name, '起司蛋餅');

const matches = core.findMeals({ language: 'zh', allergensToAvoid: ['dairy'], categories: ['main', 'drink'], maxUnitPrice: 50 });
assert.deepEqual(matches.matches.map(item => item.id), [3, 2]);
assert.equal(matches.warnings.length, 1);

const draft = core.createOrderDraft({
  requestId: 'phone-agent-demo-001',
  language: 'zh',
  constraints: { allergensToAvoid: ['dairy'], maxTotal: 150 },
  lines: [
    { itemId: 2, quantity: 1, optionKeys: [] },
    { itemId: 3, quantity: 1, optionKeys: ['sugar0', 'iceNone'] }
  ]
});
assert.equal(draft.total, 50);
assert.equal(draft.requiresUserConfirmation, true);
assert.equal(draft.deliveryStatus, 'not-connected');
assert.equal(core.createOrderDraft({ requestId: 'phone-agent-demo-001', lines: [{ itemId: 1, quantity: 1 }] }).draftId, draft.draftId);

assert.throws(() => core.createOrderDraft({ requestId: 'allergen-conflict', constraints: { allergensToAvoid: ['dairy'] }, lines: [{ itemId: 1, quantity: 1, optionKeys: [] }] }), /allergen_conflict/);
assert.throws(() => core.createOrderDraft({ requestId: 'over-budget', constraints: { maxTotal: 10 }, lines: [{ itemId: 3, quantity: 1, optionKeys: [] }] }), /maxTotal/);
assert.throws(() => core.confirmOrder({ draftId: draft.draftId, userConfirmed: false }), /explicit user confirmation/);

const confirmed = core.confirmOrder({ draftId: draft.draftId, userConfirmed: true });
assert.equal(confirmed.status, 'confirmed');
assert.equal(confirmed.confirmedAt, '2026-09-05T00:00:00.000Z');
assert.equal(confirmed.deliveryStatus, 'not-connected');

console.log('PASS: MCP ordering core contract tests');
