import React, { useEffect } from 'react';
import { Outlet, redirect } from 'react-router';
import LeftPanel from './components/LeftPanel/LeftPanel';
import TopNav from './components/TopNav/TopNav';
import TitleBar from './components/TitleBar/TitleBar';
import { BsCollectionFill, BsXLg, BsWindowFullscreen, BsWindowStack, BsDashLg, BsSunFill, BsMoonStarsFill, BsGit } from "react-icons/bs";
import classes from './OutletPanels.module.css'
import { NavLink } from 'react-router-dom';
import { appWindow } from '@tauri-apps/api/window'
import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { goToLayer } from '../../store/layerPath/slice';
import { useDispatch } from 'react-redux';

const OutletPanels = () => {
    const [maximizedFlag, setMaximizedFlag] = useState(false);
    const [appTheme, useAppTheme] = useTheme();

    const dispatch = useDispatch();

    useEffect(() => {
        appWindow.isMaximized().then(response => setMaximizedFlag(response));
        const handleResize = () => {
            appWindow.isMaximized().then(response => { setMaximizedFlag(response); });
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
            <div className={classes.LeftPanel}>
                <LeftPanel>
                    <NavLink className={({ isActive }) => (`${classes.IconContainer}  ${isActive ? classes.NavIconActive : ""}`)} to='/' onClick={()=>dispatch(goToLayer(-1))}>
                        <BsCollectionFill className={classes.Icon} />
                    </NavLink>
                    {/* <NavLink className={({ isActive }) => (`${classes.IconContainer}  ${isActive ? classes.NavIconActive : ""}`)} to='/graph'>
                        <BsGit className={classes.Icon} />
                    </NavLink> */}
                </LeftPanel>
                <LeftPanel className={classes.LeftPanelBottom}>
                    <div className={classes.IconContainer}>
                        {
                            appTheme == "light" ?
                                <BsSunFill className={classes.Icon} onClick={() => useAppTheme("dark")} />
                                : <BsMoonStarsFill className={classes.Icon} onClick={() => useAppTheme("light")} />
                        }
                    </div>
                </LeftPanel>
            </div>
            <Outlet />
        </div>
    );
};

export default OutletPanels;