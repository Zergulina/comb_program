import classes from "./LayerElementNav.module.css"
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BsJournalText, BsTable, BsBoxArrowInRight, BsBoxArrowLeft, BsPlusCircle } from "react-icons/bs";
import { createInputParameterApi } from "../../api/createInputParameterApi";
import { createOutputParameterApi } from "../../api/createOutputParameterApi";
import { useDispatch, useSelector } from "react-redux";
import { getPrevLayerId } from "../../../../store/selectors";

const LayerElementNav = () => {
    const location = useLocation();

    const dispatch = useDispatch();

    const layerId = useSelector(getPrevLayerId);

    const createInputParameter = () => {
        createInputParameterApi("Новый параметр", layerId, dispatch);
    }

    const createOutputParameter = () => {
        createOutputParameterApi("Новый параметр", layerId, dispatch);
    }

    return (
        <div>
            <div className={classes.LayerElementNav}>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/table">
                    <BsTable className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/output">
                    <BsJournalText className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/input-parameters">
                    <BsBoxArrowInRight className={classes.Icon} />
                </NavLink>
                <NavLink className={({ isActive }) => `${classes.IconContainer} ${isActive ? classes.NavIconActive : ""}`} to="/element/output-parameters">
                    <BsBoxArrowLeft className={classes.Icon} />
                </NavLink>
                <div className={`${classes.IconContainer} ${classes.AddButton}`}
                    style={["/element/input-parameters", "/element/output-parameters"].includes(location.pathname) ? {} : { display: "none" }}
                    onClick={location.pathname == "/element/input-parameters" ? createInputParameter : location.pathname == "/element/output-parameters" ? createOutputParameter : null}
                >
                    <BsPlusCircle className={classes.Icon} />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export { LayerElementNav };