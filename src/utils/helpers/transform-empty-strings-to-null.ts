export const transformEmptyStringsToNull = <T>(data: T): T => {
    if (data === null || data === undefined) return data;

    if (typeof data === 'string') {
        return (data.trim() === '' ? null : data) as T;
    }

    if (Array.isArray(data)) {
        return data.map(transformEmptyStringsToNull) as unknown as T;
    }

    if (typeof data === 'object') {
        const result: Record<string, unknown> = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = transformEmptyStringsToNull((data as Record<string, unknown>)[key]);
            }
        }
        return result as T;
    }

    return data;
};
