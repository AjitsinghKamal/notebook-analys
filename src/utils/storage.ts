import localforage from 'localforage';

export const setCache = async (key: string, value: string) => {
	try {
		await localforage.setItem(key, value);
	} catch (e) {
		console.log(e);
	}
};

export const getCache = async <T>(key: string) => {
	try {
		const data: T | null = await localforage.getItem(key);
		return data;
	} catch (e) {
		console.log(e);
	}
};
