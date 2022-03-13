import MobileSidebar from '../Sidebar/MobileSidebar';
import { GrContactInfo } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import "../Sidebar/sidebar.css"

import { useState, useEffect } from "react";
import { jsUpdateSize } from '../../functions';

const Topbar = (props) => {

    const [getWidth, setWidth] = useState(1000)

    useEffect(() => {
        const jsUpdateSize = () => {
            // Get the dimensions of the viewport
            var width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            setWidth(width)
        };
        window.onresize = jsUpdateSize;
    }, [getWidth])
    
    function openLeftNav() {
        if(getWidth < 750){
            document.getElementById("mobile-left-mySidenav").style.width = "100vw";
        }else{
            document.getElementById("mobile-left-mySidenav").style.width = "50vw";
        }
        
    }

    function openRightNav() {
        
        if(getWidth < 750){
            
            document.getElementById("mobile-right-mySidenav").style.width = "100vw";
        }else{
            document.getElementById("mobile-right-mySidenav").style.width = "40vw";
        }
    }
    return (
        <div>
            <div className='mailtop'>
                <MobileSidebar side={"left"} following={props.following}/>
                    <div className='widge-bg-left'>
                        <div className='side-widget left-widget'>
                            <button className='widget-btn ham-btn' onClick={openLeftNav}><GiHamburgerMenu/></button>
                        </div>
                    </div>
                    <div className='widge-bg-right'>
                        <div className='side-widget right-widget'>
                            <button className='widget-btn contact-widget-btn' onClick={openRightNav}><GrContactInfo /></button>
                        </div>
                    </div>
                    
                <MobileSidebar side={"right"} following={props.following}/>
            </div>
            <div className='mail-title'>
                {props.page}
            </div>
        </div>
        
    )
}

export default Topbar