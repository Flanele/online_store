import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneItem } from '../http/itemAPI';
import { fetchBrand } from '../http/brandAPI';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const useItemData = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({ info: [] });
    const [brandName, setBrandName] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const getItem = async () => {
            try {
                const data = await fetchOneItem(id);
                setItem(data);
                setImageSrc(`${apiUrl}/${data.img}`);
                const brand = await fetchBrand(data.brandId);
                setBrandName(brand.name);
            } catch (error) {
                console.error("Error fetching item or brand:", error);
            } finally {
                setLoading(false);
            }
        };
        getItem();
    }, [id]);

    return {
        loading,
        item,
        brandName,
        imageSrc,
        setImageSrc,
        setItem,
    };
};

export default useItemData;
