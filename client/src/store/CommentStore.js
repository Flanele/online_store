import { makeAutoObservable } from "mobx";

export default class CommentStore {
    constructor() {
        this._comments = [];
        this._ratings = []; 
        this._page = 1;
        this._totalCount = 0;
        this._limit = 6;

        makeAutoObservable(this);
    };

    setComments(comments) {
        this._comments = comments;
    };

    setRatings(ratings) {
        this._ratings = ratings;
    };

    setPage(page) {
        this._page = page;
    };

    setTotalCount(count) {
        this._totalCount = count;
    };

    setLimit(limit) {
        this._limit = limit;
    };

    get comments() {
        return this._comments;
    };

    get ratings() {
        return this._ratings;
    };

    get page() {
        return this._page;
    };

    get totalCount() {
        return this._totalCount;
    };

    get limit() {
        return this._limit;
    };
};
