import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConnectButton from '../ConnectButton';
import './header.css'
const Header = (props) => {

    useEffect(() => {
        const elem = document.getElementById('network-select');
        elem.value = props.currentNetwork
    }, [props.currentNetwork])

    return (
    <div className='navbar'>
        <div className='logo'>
            <span className='cy-logo'>CYBER</span><span className='mail-logo'>Mail</span> 
        </div>
        <div className='sidenav-netwrap'>
            <div className='account-menu-txt'>
                {props.account.slice(0,2)+"..."+props.account.slice(38,43)}
            </div>
                <select className='select-btn' name="" id="network-select">
                    <option value={1}>Mainnet</option>
                    <option value={4}>Rinkeby</option>
                    <option value={56}>BSC</option>
                    <option value={137}>MATIC</option>
                    <option value={43114}>AVAX</option>
                </select>
            <div>
                <ConnectButton connecting={props.connecting} connected={props.connected} connect={props.connect} />
            </div>
            
        </div>
        
    </div>
    );
};

export default Header;