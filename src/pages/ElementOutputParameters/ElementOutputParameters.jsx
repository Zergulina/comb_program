import { OutputParameterList } from '../../modules/OutputParameterList';
import pageClasses from '../Page.module.css'
import classes from './ElementOutputParameters.module.css'

const ElementOutputParameters = () => {
    return (
        <div className={pageClasses.Page}>
            <OutputParameterList className={classes.OutputParameterList}/>
        </div>
    );
};

export default ElementOutputParameters;