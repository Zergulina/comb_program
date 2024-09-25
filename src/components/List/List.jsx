import classes from './List.module.css'

const List = ({children, className}) => {
    return (
        <div className={`${classes.List} ${className}`}>
            {children}
        </div>
    );
};

export default List;