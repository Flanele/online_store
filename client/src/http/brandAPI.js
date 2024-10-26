import { $host } from ".";

export const fetchBrand = async (brandId) => {
    const { data } = await $host.get(`api/brand/${brandId}`);
    return data;
};