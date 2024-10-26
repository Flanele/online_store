import { useContext, useEffect, useState } from 'react';
import { Context } from '../main'; 
import { createItem, fetchBrands, fetchTypes, fetchItems } from '../http/itemAPI';

const useAddNewItem = (onClose) => {
    const { item } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            const typesData = await fetchTypes();
            item.setTypes(typesData);
            const brandsData = await fetchBrands();
            item.setBrands(brandsData);
        };
        fetchInitialData();
    }, [item]);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const addItem = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', selectedBrand.id); 
        formData.append('typeId', selectedType.id);  
        formData.append('info', JSON.stringify(info));

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            await createItem(formData); 
            const updatedItems = await fetchItems(null, null, item.page, item.limit); 
            item.setItems(updatedItems.rows); 
            item.setTotalCount(updatedItems.count);
            onClose();  
            setSelectedType(null);  
            setSelectedBrand(null);  
        } catch (err) {
            console.error(err);
        }
    };

    return {
        name,
        setName,
        price,
        setPrice,
        file,
        selectFile,
        info,
        addInfo,
        removeInfo,
        changeInfo,
        selectedType,
        setSelectedType,
        selectedBrand,
        setSelectedBrand,
        addItem,
    };
};

export default useAddNewItem;
