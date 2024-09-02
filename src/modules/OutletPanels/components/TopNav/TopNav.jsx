import React from 'react';
import classes from './TopNav.module.css'
import { BsArrowLeftShort } from 'react-icons/bs';
import { popLayer, goToLayer } from '../../../../store/layerPath/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router';
import { useNavigate } from 'react-router';

const TopNav = ({ className }) => {
    const dispatch = useDispatch();
    const layerPath = useSelector(state => state.layerPath);

    const navigate = useNavigate();

    return (
        <div className={classes.TopNav + " " + className}>
            <BsArrowLeftShort className={classes.NavArrow} onClick={() => {dispatch(popLayer()); navigate("/")}} />
            <div className={classes.PathText}>
                <div className={classes.PathTextUnit} onClick={() => {dispatch(goToLayer(-1)); navigate("/")}}>{"root/"}</div>
                {
                    layerPath.map((layer, index) => {
                        return <div
                            key={layer.id}
                            className={classes.PathTextUnit}
                            onClick={() =>{ 
                            if (index != layerPath.length - 1){
                                dispatch(goToLayer(index))
                                navigate("/")
                            }}}>
                            {layer.name + "/"}
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default TopNav;