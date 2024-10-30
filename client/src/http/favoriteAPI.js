import { $authHost } from ".";

export const fetchFavorites = async () => {
    const { data } = await $authHost.get('api/favorites');
    return data;
};

export const addToFavorites = async(itemId) => {
    const { data } = await $authHost.post('api/favorites', { itemId });
    return data;
};

export const removeFromFavorites = async(favoriteItemId) => {
    const { data } = await $authHost.delete(`api/favorites/${favoriteItemId}`);
    return data;
};