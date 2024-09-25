import { InputParameterList } from '../../modules/InputParameterList';
import pageClasses from '../Page.module.css'
import classes from './ElementInputParameters.module.css'

const ElementInputParameters = () => {
    return (
        <div className={pageClasses.Page}>
            <InputParameterList className={classes.InputParameterList}/>
        </div>
    );
};

export default ElementInputParameters;