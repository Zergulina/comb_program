import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import TopNav from '../../components/TopNav/TopNav';
import TitleBar from '../../components/TitleBar/TitleBar';
import { BsCollectionFill, BsDatabaseFillDown, BsDatabaseFillUp, BsXLg, BsWindowFullscreen, BsWindowStack, BsDashLg } from "react-icons/bs";
import classes from './OutletPanels.module.css'
import { NavLink } from 'react-router-dom';
import { appWindow } from '@tauri-apps/api/window'
import { useState } from 'react';

const OutletPanels = () => {
    const [maximizedFlag, setMaximizedFlag] = useState(false);

    useEffect(() => {
        appWindow.isMaximized().then(response => setMaximizedFlag(response));
        const handleResize = () => {
            appWindow.isMaximized().then(response => {setMaximizedFlag(response); console.log(response);});
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <div>
            <TitleBar className={`${classes.TitleBar}  ${(maximizedFlag ? classes.Maximized : classes.Unmaximized)}`} >
                <div className={classes.Left} data-tauri-drag-region>

                </div>
                <div className={classes.Right} data-tauri-drag-region>
                    <BsDashLg className={classes.Icon} onClick={() => appWindow.minimize()} style={{ right: "90px", top: "0" }} />
                    {maximizedFlag ?
                        <BsWindowStack className={classes.Icon} onClick={() => { appWindow.unmaximize() }} style={{ right: "45px", top: "0" }} />
                        :
                        <BsWindowFullscreen className={classes.Icon} onClick={() => { appWindow.maximize() }} style={{ right: "45px", top: "0" }} />
                    }
                    <BsXLg className={`${classes.Icon}  ${classes.Quit}`} onClick={() => appWindow.close()} style={{ right: "0", top: "0" }} />
                </div>
            </TitleBar>
            <TopNav className={classes.TopNav} />
            <LeftPanel className={classes.LeftPanel}>
                <NavLink className={({ isActive }) => classes.NavIcon + " " + (isActive ? classes.NavIconActive : "")} to='/'>
                    <BsCollectionFill className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => classes.NavIcon + " " + (isActive ? classes.NavIconActive : "")} to='/import'>
                    <BsDatabaseFillDown className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => classes.NavIcon + " " + (isActive ? classes.NavIconActive : "")} to='/export'>
                    <BsDatabaseFillUp className={classes.Icon} />
                </NavLink>
            </LeftPanel>
            <Outlet />
        </div>
    );
};

export default OutletPanels;