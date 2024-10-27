import React, { useState, useEffect } from 'react';
import search from '../assets/search.svg';
import './styles/SearchSection.css';
import UserOptions from './UserOptions';

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
            <UserOptions />                    
        </div>
    );
};

export default SearchSection;

