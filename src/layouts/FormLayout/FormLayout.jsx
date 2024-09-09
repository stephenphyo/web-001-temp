import { Outlet } from 'react-router-dom';

/*** CSS Imports ***/
import './FormLayout.css';

function FormLayout() {

    return (
        <section className='form_layout'>
            <div className='form_layout_container'>
                <Outlet />
            </div>
        </section>
    );
}

export default FormLayout;