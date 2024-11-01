import { $authHost, $host } from './index';

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data
};

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data
};

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand);
    return data
};

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand');
    return data
};

export const createItem = async (item) => {
    const { data } = await $authHost.post('api/item', item);
    return data
};

export const updateItem = async (id, item) => {
    const { data } = await $authHost.patch(`api/item/${id}`, item);
    return data;
};

export const fetchItems = async (typeId, brandId, page, limit = 12, searchTerm = '') => {
    const { data } = await $host.get('api/item', {
        params: {
            typeId,
            brandId,
            page,
            limit,
            searchTerm 
        }
    });

    console.log('Fetched data:', data);
    return data;
};


export const fetchOneItem = async (id) => {
    const { data } = await $host.get('api/item/' + id);
    return data;
};

export const fetchCommentsWithRatings = async (id, page, limit = 6) => {
    const { data } = await $host.get(`api/item/${id}/comments`, {
        params: {
            page,
            limit
        }
    });
    return data;
};

export const addComment = async (id, {text}) => {
    const {data} = await $authHost.post(`api/item/${id}/comments`, {text});
    console.log('Comment:', data);
    return data;
};

export const addRating = async (id, {rate}) => {
    const {data} = await $authHost.post(`api/item/${id}/rating`, {rate});
    console.log("Rating:", rate);
    return data;
};