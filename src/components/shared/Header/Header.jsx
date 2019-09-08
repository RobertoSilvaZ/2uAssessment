import React from 'react';
import logo from '../../../assets/images/LaundryLogo.svg';

import './Header.scss';

const Header = () => {
    return (
    <header> 
        <div className="container">
            <div className="row "> 
                <div className="col-md-3"><img src={logo} alt="Logo" className="  logo-brand"/></div>
            </div>
        </div> 
    </header>
    );
};

export default Header;
