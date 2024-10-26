import React, { useContext, useEffect, useMemo } from 'react';
import { Context } from '../main';
import { fetchBrands, fetchItems, fetchTypes } from '../http/itemAPI';

const useShopData = () => {
    const {item} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => 
            item.setTypes(data));
        fetchBrands().then(data => 
            item.setBrands(data));
        fetchItems(null, null, 1, 12).then(data => {
            item.setItems(data.rows);
            item.setTotalCount(data.count);
        });
    }, []);

    const typeId = useMemo(() => {
        return item.selectedType && item.selectedType.id ? item.selectedType.id : null;
    }, [item.selectedType]);

    const brandId = useMemo(() => {
        return item.selectedBrand && item.selectedBrand.id ? item.selectedBrand.id : null;
    }, [item.selectedBrand]);

    useEffect(() => {
        fetchItems(typeId, brandId, item.page, item.limit)
        .then(data => {
            item.setItems(data.rows);
            item.setTotalCount(data.count);
        });
    }, [typeId, brandId, item.page, item.limit]);

    return {item};

};

export default useShopData;