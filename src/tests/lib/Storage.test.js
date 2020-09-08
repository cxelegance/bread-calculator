import AppStorage from '../../lib/AppStorage';
const storage = new AppStorage(
	process.env.LS_ITEM_NAME,
	process.env.LS_ID_NAME,
	process.env.LS_NAMESPACE
);

test('setNextId should return the same number given to it', () => {
	expect(storage.setNextId(0)).toBe(0);
	expect(storage.setNextId(1)).toBe(1);
	expect(storage.setNextId(5)).toBe(5);
});

test('setNextId should return the biggest integer plus 1 when given an array of integers', () => {
	expect(storage.setNextId([])).toBe(0);
	expect(storage.setNextId([0])).toBe(1);
	expect(storage.setNextId([1])).toBe(2);
	expect(storage.setNextId([2])).toBe(3);
	expect(storage.setNextId([0, 1, 2])).toBe(3);
	expect(storage.setNextId([2, 5, 7])).toBe(8);
});

test('getNextId should return the whatever setNextId has been sent', () => {
	storage.setNextId([]);
	expect(storage.getNextId()).toBe(0);
	storage.setNextId(1);
	expect(storage.getNextId()).toBe(1);
	storage.setNextId(111);
	expect(storage.getNextId()).toBe(111);
});