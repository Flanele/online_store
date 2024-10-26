import React, { useMemo } from 'react';

const useFilteredItems = (items, searchTerm) => {
    return useMemo(() => {
        console.log('Товары для фильтрации:', items);
        console.log('Поисковый термин:', searchTerm);
        
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);
};

export default useFilteredItems;
