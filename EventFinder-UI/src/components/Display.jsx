import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EventDetails.css';
// import { AsyncPaginate } from 'react-select-async-paginate';

// holding place for placeholder Display code

/* <AsyncPaginate
placeholder="display Saint Louis"
debounceTimeout={600}
/> */

const Display = () => {
    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Weather Display</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;