import { useState} from 'react';
import PropTypes from 'prop-types';

const SearchForm = (props) => {
    const [formLocation, setFormLocation] = useState(
        '',
    );

    const handleSubmit = (event) => {
        console.log('##### in handleSubmit');
        event.preventDefault();

        props.onGetLocationLonLat(formLocation);

        // setFormLocation('');
    };
    const handleInputChange = (event) => {
        console.log('handlePlaceChange');
        setFormLocation(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input value={formLocation} onChange={handleInputChange}/>
                <input type='submit' value='Search Now!'></input>
            </div>
        </form>
    );
};

SearchForm.propTypes = {
    onGetLocationLonLat: PropTypes.func.isRequired,
};

export default SearchForm;