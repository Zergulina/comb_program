import classes from './InputText.module.css'

const InputText = ({value, setValue, placeholder, className}) => {
    return (
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} className={`${classes.InputText} ${className}`}/>
    );
};

export default InputText;