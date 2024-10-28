import { $authHost } from ".";

export const fetchCart = async () => {
    const { data } = await $authHost.get('api/cart');
    return data;
};

export const addToCart = async(itemId) => {
    const { data } = await $authHost.post('api/cart', { itemId });
    return data;
};

export const removeFromCart = async(cartItemId) => {
    const { data } = await $authHost.delete(`api/cart/${cartItemId}`);
    return data;
};