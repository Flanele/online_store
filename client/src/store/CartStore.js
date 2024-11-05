import { makeAutoObservable } from "mobx";
import { fetchCart, addToCart, removeFromCart } from "../http/cartAPI";

export default class CartStore {
    constructor() {
        this._items = [];
        makeAutoObservable(this);
        this.loadCartFromLocalStorage();
    };

    loadCartFromLocalStorage() {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.setItems(savedCart); 
    };

    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this._items));
    };

    async loadCartItems() {
        const data = await fetchCart(); 
        this.setItems(data); 
        this.saveCartToLocalStorage();
    };

    addItem = async (item) => {
        await addToCart(item.id); 
        await this.loadCartItems();
    };

    removeItem = async (cartItemId) => {
        await removeFromCart(cartItemId);
        await this.loadCartItems();
    };

    setItems(items) {
        this._items = items.cart_items || [];
        this.saveCartToLocalStorage();
    };


    get items() {
        return this._items;
    };

    get total() {
        if (!Array.isArray(this._items)) return 0;
    
        return this._items.reduce((total, cartItem) => {
            const itemPrice = cartItem.item?.price || 0; 
            const itemQuantity = cartItem.quantity || 1;
            return total + itemPrice * itemQuantity;
        }, 0);
    }
};