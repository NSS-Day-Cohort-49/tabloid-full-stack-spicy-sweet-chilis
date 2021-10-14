import { getToken } from "./authManager";
import { useHistory } from "react-router";

const baseUrl = '/api/category'

// export const getAllCategories = () => {
//     return fetch(baseUrl)
//     .then((res) => res.json())
// };

// export const addCategory = (category) => {
//     return fetch(baseUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(category),
//         })
// }

export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("An unknown error occurred while trying to get categories.");
        }
        });
    });
    };


export const  getCategoryById =(id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(res => {
        if (res.ok) {
            return res.json(id);
        } else {
            throw new Error("An unknown error occurred while trying to get categories.");
        }
        });
    });
    };


export const AddCategory = (category) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
        }).then(resp => {
        if (resp.ok) {
            return resp.json();
        } else if (resp.status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("An unknown error occurred while trying to save a new category.");
        }
        });
    });
};

export const updateCategory = (category) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}, /${category.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
        }).then(resp => {
        if (resp.ok) {
            return resp.json();
        } else if (resp.status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("An unknown error occurred while trying to save a new category.");
        }
        });
    });
};


export const deleteCategory = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
        }).then(resp => {
        if (resp.ok) {
            return resp.json();
        } else if (resp.status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("An unknown error occurred while trying to save a new category.");
        }
        });
    });
};

