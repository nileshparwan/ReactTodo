import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBox.css';

function SearchBox({ submitHandler, searchInput, setSearchInput }) {
    

    const searchHandler = (event) => {
        event.preventDefault();
        const searchBox = event.currentTarget.parentElement;
        const searchBtn = event.currentTarget;
        const searchInput = searchBox.querySelector('input');
        searchBox.classList.toggle('active');
        searchBtn.classList.toggle('active');
        searchInput.classList.toggle('active');
        searchInput.focus();
    };

    const inputHandler = (event) => {
        const searchBox = event.currentTarget.parentElement;
        const submitBtn = searchBox && searchBox.querySelector(".searchBox__submitIcon");
        if (submitBtn && event.target.value.length > 0) {
            submitBtn.classList.add('submit');
            return setSearchInput(event.target.value);
        }
        setSearchInput('');
        (submitBtn && submitBtn.classList.contains('submit')) && submitBtn.classList.remove('submit');
        return;
    };

    return (
        <div className="searchBox">
            <input type="text" value={searchInput} onChange={e => inputHandler(e)} aria-label="search" placeholder="Type to search..." />
            <button type="submit" aria-label="submit-btn" onClick={submitHandler} className="searchBox__submitIcon">
                <SearchIcon />
            </button>
            <button aria-label="search-btn" onClick={searchHandler} className="searchBox__searchIcon">
                <SearchIcon />
            </button>
        </div>
    );
}

export default SearchBox;
