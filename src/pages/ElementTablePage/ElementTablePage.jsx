import ElementTable from '../../modules/ElementTable/ElementTable/ElementTable';
import pageClasses from '../Page.module.css'

const ElementTablePage = () => {
    return (
        <div className={pageClasses.Page}>
            <ElementTable/>
        </div>
    );
};

export default ElementTablePage;