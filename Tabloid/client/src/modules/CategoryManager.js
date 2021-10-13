const baseUrl = '/api/category'

export const getAllCategories = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const addCategory = () => {
    return fetch(`${baseUrl}/add`)
    .then((res) => res.json())
}