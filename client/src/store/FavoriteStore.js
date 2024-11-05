import { makeAutoObservable } from "mobx";
import { addToFavorites, fetchFavorites, removeFromFavorites } from "../http/favoriteAPI";

export default class FavoriteStore {
    constructor() {
        this._items = [];
        makeAutoObservable(this);
        this.loadFavoritesFromLocalStorage(); 
    };

    loadFavoritesFromLocalStorage() {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.setFavorites(savedFavorites); 
    };

    async loadFavoriteItems() {
        const data = await fetchFavorites(); 
        this.setFavorites(data); 
        this.saveFavoritesToLocalStorage(); 
    };

    addItemToFav = async (item) => {
        await addToFavorites(item.itemId); 
        await this.loadFavoriteItems(); 
    };

    removeItemFromFav = async (favoriteItemId) => {
        await removeFromFavorites(favoriteItemId);
        await this.loadFavoriteItems(); 
    };

    setFavorites(items) {
        this._items = items.favorite_items || [];
        this.saveFavoritesToLocalStorage(); 
    };

    saveFavoritesToLocalStorage() {
        localStorage.setItem('favorites', JSON.stringify(this._items));
    };

    isItemFavorite(itemId) {
        return this._items.some(favoriteItem => favoriteItem.itemId === itemId);
    };

    get favorites() {
        return this._items;
    };
};