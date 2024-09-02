import classes from "./LayerElementNav.module.css"
import { NavLink, Outlet } from "react-router-dom";
import { BsJournalText, BsTable, BsTools } from "react-icons/bs";

const LayerElementNav = () => {
    return (
        <div>
            <div className={classes.LayerElementNav}>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/output">
                    <BsJournalText className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/table">
                    <BsTable className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/parameters">
                    <BsTools className={classes.Icon} />
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export { LayerElementNav };