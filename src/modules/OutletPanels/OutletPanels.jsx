import React from 'react';
import { Outlet } from 'react-router';
import LeftPanel from '../../components/UI/LeftPanel/LeftPanel';
import TopNav from '../../components/UI/TopNav/TopNav';
import { BsCollectionFill,BsDatabaseFillDown,BsDatabaseFillUp } from "react-icons/bs";
import classes from './OutletPanels.module.css'
import { NavLink } from 'react-router-dom';

const OutletPanels = () => {
    return (
        <div>
            <TopNav />
            <LeftPanel>
                <NavLink className={({isActive})=>classes.NavIcon + " " + (isActive? classes.NavIconActive : "")} to='/'>
                    <BsCollectionFill className={classes.Icon} />
                </NavLink>
                <NavLink className={({isActive})=>classes.NavIcon + " " + (isActive? classes.NavIconActive : "")} to= '/import'>
                    <BsDatabaseFillDown  className={classes.Icon} />
                </NavLink>
                <NavLink className={({isActive})=>classes.NavIcon + " " + (isActive? classes.NavIconActive : "")} to= '/export'>
                    <BsDatabaseFillUp  className={classes.Icon} />
                </NavLink>
            </LeftPanel>
            <Outlet />
        </div>
    );
};

export default OutletPanels;