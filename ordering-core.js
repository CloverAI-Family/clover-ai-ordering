(function exposeOrderingCore(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CloverOrderingCore = api;
})(typeof globalThis === 'object' ? globalThis : this, function buildOrderingCore() {
'use strict';

function createOrderingCore({ menu, itemRules, optionPrices, addonRules, now = () => new Date().toISOString() }) {
  if (!Array.isArray(menu) || !itemRules || !optionPrices || !addonRules) {
    throw new TypeError('menu, itemRules, optionPrices, and addonRules are required');
  }

  const draftsById = new Map();
  const draftIdByRequest = new Map();
  let draftSequence = 0;
  const languages = new Set(['zh', 'ja', 'en', 'ko']);

  const clone = value => JSON.parse(JSON.stringify(value));
  const findItem = id => menu.find(item => item.id === id);
  const normalizeLanguage = language => languages.has(language) ? language : 'en';
  const normalizeList = value => Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string'))] : [];

  function allowedOptionKeys(item) {
    const rules = itemRules[item.id] || {};
    const keys = [...(rules.addons || []), ...(rules.removes || [])];
    if (item.cat === 'snack') keys.push('ketchup', 'pepper');
    if (item.cat === 'drink') keys.push('medium', 'large', 'sugar0', 'sugarHalf', 'sugarFull', 'iceNone', 'iceLess', 'iceNormal');
    return [...new Set(keys)];
  }

  function itemMatches(item, constraints = {}, optionKeys = []) {
    const rules = itemRules[item.id];
    if (!rules) return { ok: false, reason: 'missing_food_metadata' };
    const allergens = normalizeList(constraints.allergensToAvoid);
    const parts = [rules, ...optionKeys.filter(key => addonRules[key]).map(key => addonRules[key])];
    if (parts.some(part => allergens.some(allergen => (part.allergens || []).includes(allergen)))) {
      return { ok: false, reason: 'allergen_conflict' };
    }
    if (constraints.diet && parts.some(part => part[constraints.diet] !== true)) {
      return { ok: false, reason: 'diet_conflict' };
    }
    return { ok: true };
  }

  function presentItem(item, language) {
    const lang = normalizeLanguage(language);
    const rules = itemRules[item.id];
    return {
      id: item.id,
      category: item.cat,
      name: item[lang],
      description: item[`${lang}Desc`],
      price: item.price,
      available: item.available !== false,
      allergens: rules ? [...(rules.allergens || [])] : null,
      dietary: rules ? { vegetarian: rules.vegetarian === true, vegan: rules.vegan === true } : null,
      optionKeys: allowedOptionKeys(item)
    };
  }

  function getMenu({ language = 'en' } = {}) {
    return {
      restaurantId: 'clover-ai-ordering-demo',
      currency: 'TWD',
      items: menu.map(item => presentItem(item, language))
    };
  }

  function findMeals({ language = 'en', allergensToAvoid = [], diet = null, categories = [], maxUnitPrice = null, limit = 5 } = {}) {
    const constraints = { allergensToAvoid: normalizeList(allergensToAvoid), diet };
    const wantedCategories = normalizeList(categories);
    const safeLimit = Number.isInteger(limit) ? Math.min(Math.max(limit, 1), 20) : 5;
    const excludedUnknownIds = [];
    const matches = menu.filter(item => {
      if (item.available === false) return false;
      if (wantedCategories.length && !wantedCategories.includes(item.cat)) return false;
      if (Number.isFinite(maxUnitPrice) && item.price > maxUnitPrice) return false;
      const result = itemMatches(item, constraints);
      if (result.reason === 'missing_food_metadata') excludedUnknownIds.push(item.id);
      return result.ok;
    }).sort((a, b) => a.price - b.price || a.id - b.id).slice(0, safeLimit);

    return {
      appliedConstraints: { ...constraints, categories: wantedCategories, maxUnitPrice },
      matches: matches.map(item => presentItem(item, language)),
      excludedUnknownIds,
      warnings: constraints.allergensToAvoid.length
        ? ['Matches use restaurant-provided labels only and do not guarantee freedom from cross-contact. Confirm with staff.']
        : []
    };
  }

  function createOrderDraft({ requestId, language = 'en', constraints = {}, lines } = {}) {
    if (typeof requestId !== 'string' || !requestId.trim()) throw new Error('requestId is required');
    if (draftIdByRequest.has(requestId)) return clone(draftsById.get(draftIdByRequest.get(requestId)));
    if (!Array.isArray(lines) || !lines.length) throw new Error('at least one order line is required');

    const normalizedConstraints = {
      allergensToAvoid: normalizeList(constraints.allergensToAvoid),
      diet: constraints.diet || null,
      maxTotal: Number.isFinite(constraints.maxTotal) ? constraints.maxTotal : null
    };
    const normalizedLines = lines.map(line => {
      const item = findItem(line.itemId);
      if (!item || item.available === false) throw new Error(`item ${line.itemId} is unavailable`);
      if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 20) throw new Error('quantity must be an integer from 1 to 20');
      const optionKeys = normalizeList(line.optionKeys);
      const allowed = allowedOptionKeys(item);
      if (optionKeys.some(key => !allowed.includes(key))) throw new Error(`unsupported option for item ${item.id}`);
      const match = itemMatches(item, normalizedConstraints, optionKeys);
      if (!match.ok) throw new Error(`item ${item.id} conflicts with constraints: ${match.reason}`);
      const unitPrice = item.price + optionKeys.reduce((sum, key) => sum + (optionPrices[key] || 0), 0);
      return { itemId: item.id, name: item[normalizeLanguage(language)], quantity: line.quantity, optionKeys, unitPrice, lineTotal: unitPrice * line.quantity };
    });
    const total = normalizedLines.reduce((sum, line) => sum + line.lineTotal, 0);
    if (normalizedConstraints.maxTotal !== null && total > normalizedConstraints.maxTotal) throw new Error('order exceeds maxTotal');

    const draft = {
      draftId: `draft-${++draftSequence}`,
      requestId,
      status: 'draft',
      currency: 'TWD',
      lines: normalizedLines,
      total,
      constraints: normalizedConstraints,
      warnings: normalizedConstraints.allergensToAvoid.length
        ? ['Allergy checks use menu labels only. Cross-contact remains unknown and must be confirmed with staff.']
        : [],
      requiresUserConfirmation: true,
      deliveryStatus: 'not-connected'
    };
    draftsById.set(draft.draftId, draft);
    draftIdByRequest.set(requestId, draft.draftId);
    return clone(draft);
  }

  function confirmOrder({ draftId, userConfirmed } = {}) {
    if (userConfirmed !== true) throw new Error('explicit user confirmation is required');
    const draft = draftsById.get(draftId);
    if (!draft) throw new Error('draft not found');
    if (draft.status === 'confirmed') return clone(draft);
    draft.status = 'confirmed';
    draft.confirmedAt = now();
    draft.requiresUserConfirmation = false;
    return clone(draft);
  }

  return { getMenu, findMeals, createOrderDraft, confirmOrder };
}

return { createOrderingCore };
});
