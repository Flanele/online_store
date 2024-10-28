import { makeAutoObservable } from "mobx";
import { fetchCart, addToCart, removeFromCart } from "../http/cartAPI";

export default class CartStore {
    constructor() {
        this._items = [];
        makeAutoObservable(this);
    };

    async loadCartItems() {
        const data = await fetchCart(); 
        this.setItems(data); 
    }

    addItem = async (item) => {
        await addToCart(item.itemId); 
        await this.loadCartItems();
    };

    removeItem = async (cartItemId) => {
        await removeFromCart(cartItemId);
        await this.loadCartItems();
    };

    setItems(items) {
        this._items = items.cart_items || [];
    };


    get items() {
        return this._items;
    };

    get total() {
        // Проверяем, что _items — это массив и содержит элементы.
        if (!Array.isArray(this._items)) return 0;
    
        return this._items.reduce((total, cartItem) => {
            const itemPrice = cartItem.item?.price || 0; // Извлекаем цену из вложенного объекта item
            const itemQuantity = cartItem.quantity || 1;
            return total + itemPrice * itemQuantity;
        }, 0);
    }
};