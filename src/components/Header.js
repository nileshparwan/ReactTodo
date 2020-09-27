import React from 'react';
import './Header.css';
import SearchBox from './SearchBox';

function Header() {
    return (
        <nav className="header">
            <div className="header__toggler">
                <input type="checkbox" aria-label="hamburger button" />
                <span></span>
            </div>
            <form className="header__form">
                <SearchBox />
            </form>
        </nav>
    );
}

export default Header;
