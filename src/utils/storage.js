import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'cherukuri-constructions',
  storeName: 'contracts',
});

const CONTRACTS_KEY = 'all_contracts';

export async function getAllContracts() {
  const data = await store.getItem(CONTRACTS_KEY);
  return data || [];
}

export async function saveContract(contract) {
  const all = await getAllContracts();
  const idx = all.findIndex((c) => c.id === contract.id);

  const now = new Date().toISOString();
  if (idx >= 0) {
    all[idx] = { ...contract, updatedAt: now };
  } else {
    all.unshift({
      ...contract,
      id: contract.id || crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    });
  }

  await store.setItem(CONTRACTS_KEY, all);
  return all;
}

export async function deleteContract(id) {
  const all = await getAllContracts();
  const filtered = all.filter((c) => c.id !== id);
  await store.setItem(CONTRACTS_KEY, filtered);
  return filtered;
}

export async function getContractById(id) {
  const all = await getAllContracts();
  return all.find((c) => c.id === id) || null;
}
