import { useCallback, useContext, useEffect } from "react";
import { Context } from "../main";
import useToastNotification from "./useToastNotification";
import { fetchFavorites } from "../http/favoriteAPI";

const useFavorites = (item) => {
    const { favorite, user } = useContext(Context);
    const { showToast } = useToastNotification();
    
    const like = favorite.isItemFavorite(item.id);
    const isAuth = user.isAuth;

    useEffect(() => {
        if (isAuth) {
            const getFavorites = async () => {
            try {
                const favorites = await fetchFavorites();
                favorite.setFavorites(favorites); 
            } catch (error) {
                console.error("Ошибка при получении избранного:", error);
            }
            };

            getFavorites(); 
        } 
        

    }, [favorite, isAuth]);

    const handleToggleFavorite = useCallback(async (event) => {
        event.stopPropagation();

        if (!isAuth) {
            showToast("Please log in.");
            return; 
        }

        if (!like) {
            try {
                await favorite.addItemToFav({ itemId: item.id });
                showToast(`${item.name} has been successfully added to the favorites!`);
            } catch (error) {
                console.error("Ошибка при добавлении товара в избранные:", error);
            }
        } else {
            const foundFavoriteItem = favorite.favorites.find(fav => fav.itemId === item.id);
            if (foundFavoriteItem) {
                try {
                    await favorite.removeItemFromFav(foundFavoriteItem.id); 
                    showToast(`${item.name} has been successfully removed from the favorites!`);
                } catch (error) {
                    console.error("Ошибка при удалении товара из избранных:", error);
                }
            } else {
                console.error("Не удалось найти ID для удаления из избранных.");
            }
        }
    }, [like, item, showToast, favorite]);

    return { like, handleToggleFavorite, isAuth };
};

export default useFavorites;