import React, { useState, useEffect } from 'react';
import bag from '../assets/bag.svg';
import heart from '../assets/heart.svg';
import search from '../assets/search.svg';
import './styles/SearchSection.css';

const SearchSection = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler); 
        };
    }, [searchTerm, onSearch]); 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search__wrapper">
            <input 
                className="search__input" 
                type="text" 
                placeholder='Search products...' 
                onChange={handleSearchChange} 
            />
            <img className="search__icon" src={search} alt="search icon" />         
            <button className="search__btn">
                <img className="search__icon-bag" src={bag} alt="bag icon" />
            </button>
            <button className="search__btn">
                <img className="search__icon-heart" src={heart} alt="heart icon" />
            </button>                     
        </div>
    );
};

export default SearchSection;

