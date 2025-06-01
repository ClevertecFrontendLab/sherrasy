export const transformEmptyStringsToNull = <T>(data: T): T => {
    if (data === null || data === undefined) return data;

    if (typeof data !== 'object') {
        return typeof data === 'string' ? ((data.trim() === '' ? null : data) as T) : data;
    }

    if (Array.isArray(data)) {
        return data.map(transformEmptyStringsToNull) as unknown as T;
    }

    const result: Record<string, unknown> = {};
    for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

        const value = (data as Record<string, unknown>)[key];
        result[key] = transformValue(key, value);
    }
    return result as T;
};

const shouldConvertToNumber = (key: string): boolean =>
    key === 'time' || key === 'portions' || key.includes('count');

function transformValue(key: string, value: unknown): unknown {
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (shouldConvertToNumber(key) && trimmed !== '') {
            const parsed = Number(trimmed);
            return isNaN(parsed) ? null : parsed;
        }
        return trimmed === '' ? null : trimmed;
    }
    return transformEmptyStringsToNull(value);
}
