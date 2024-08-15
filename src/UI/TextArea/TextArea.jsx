import classes from './TextArea.module.css'

const TextArea = ({value, setValue, placeholder, className}) => {
    return (
        <textarea value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} className={`${classes.TextArea} ${className}`}/>
    );
};

export default TextArea;