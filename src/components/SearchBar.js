// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Buscar Pokémon..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit">Buscar</button>
        </form>
    );
}

export default SearchBar;
