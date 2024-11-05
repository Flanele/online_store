import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToastNotification from "../hooks/useToastNotification";
import useFavorites from "../hooks/useFavorites";
import { fetchBrand } from "../http/brandAPI";
import { addToCart } from "../http/cartAPI";
import { Context } from "../main";
import { ITEM_ROUTE } from "../utils/consts";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const useFavoriteItem = (item) => {
    const [brandName, setBrandName] = useState('');
    const { showToast } = useToastNotification();
    const { favorite } = useContext(Context);
    const navigate = useNavigate();
    const { like, handleToggleFavorite } = useFavorites(item);

    useEffect(() => {
        const getBrand = async () => {
            try {
                const brand = await fetchBrand(item.item.brandId);
                setBrandName(brand.name);
            } catch (error) {
                console.error("Ошибка при получении бренда:", error);
            }
        };
        getBrand();
    }, [item.item.brandId]);

    const handleAddToCart = useCallback(async (event) => {
        event.stopPropagation();
        try {
            await addToCart(item.item.id);
            showToast("Thank you!", `${item.item.name} has been successfully added to the cart.`, "success");
        } catch (error) {
            console.error("Ошибка при добавлении товара в корзину:", error);
        }
    }, [item.item, showToast]);

    const handleRemove = useCallback(async (event) => {
        event.stopPropagation();
        const foundFavoriteItem = favorite.favorites.find(fav => fav.itemId === item.item.id);
        await favorite.removeItemFromFav(foundFavoriteItem.id);
        showToast(`${item.item.name} has been successfully removed from the favorites!`);
    }, [item.item, showToast]);

    const goToItemPage = () => navigate(ITEM_ROUTE + '/' + item.item.id);

    return {
        brandName,
        handleAddToCart,
        handleRemove,
        goToItemPage,
        like,
        handleToggleFavorite,
    };
};

export default useFavoriteItem;
