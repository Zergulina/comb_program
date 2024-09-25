import { BsX } from 'react-icons/bs';
import classes from './Card.module.css'

const Card = ({className, children, crossOnClick}) => {
    return (
        <div className={`${classes.Card} ${className}`}>
            <BsX className={classes.Cross} onClick = {crossOnClick}/>
            {children}
        </div>
    );
};

export default Card;    