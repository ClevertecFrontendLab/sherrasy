export const setDataToLocalStorage = (key: string, data: unknown) => {
    const preparedData = JSON.stringify(data);
    localStorage.setItem(key, preparedData);
};

export const getDataFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};
