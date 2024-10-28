import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useEditItem = (itemData) => {
    const [name, setName] = useState(itemData.name);
    const [price, setPrice] = useState(itemData.price);
    const [file, setFile] = useState(itemData.img);
    const [descriptions, setDescriptions] = useState(
        itemData.info.map((desc) => ({ ...desc, number: uuidv4() })) || []
    );

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addDescription = () => {
        setDescriptions([...descriptions, { title: '', description: '', number: uuidv4() }]);
    };

    const updateDescription = (key, value, number) => {
        setDescriptions(descriptions.map((desc) => (desc.number === number ? { ...desc, [key]: value } : desc)));
    };

    const deleteDescription = (number) => {
        const updatedDescriptions = descriptions.filter((desc) => desc.number !== number);
        setDescriptions(updatedDescriptions);
    };

    const getUpdatedItem = () => ({
        name,
        price,
        img: file,
        info: descriptions,
    });

    return {
        name,
        setName,
        price,
        setPrice,
        file,
        descriptions,
        handleFileChange,
        addDescription,
        updateDescription,
        deleteDescription,
        getUpdatedItem,
    };
};

export default useEditItem;
