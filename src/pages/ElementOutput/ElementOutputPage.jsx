import ElementOutput from '../../modules/ElementOutput/ElementOutput/ElementOutput';
import InputList from '../../modules/ElementOutput/InputList/InputList';
import pageClasses from '../Page.module.css'

const ElementOutputPage = () => {
    return (
        <div className={pageClasses.Page}>
            <ElementOutput/>
        </div>
    );
};

export default ElementOutputPage;