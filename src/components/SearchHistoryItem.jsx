import PropTypes from 'prop-types';

const SearchHistoryItem = (props) => {
    // console.log('asd');
    return (
        <section>
            <h3>{props.eachHistory.location}</h3>
            {/* <p>Latitude: {props.eachHistory.latitude}  Longitude:{props.eachHistory.longitude} </p> */}
            {/* &nbsp; stands for Non-Breaking Space in HTML. */}
            {/* Useful for adding extra fixed spaces or keeping words from splitting into two lines. */}
            <p>
                Latitude: {props.eachHistory.latitude} &nbsp; &nbsp; Longitude: {props.eachHistory.longitude}
            </p>
        </section>
    );
};


SearchHistoryItem.propTypes = {
    location: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,

};

SearchHistoryItem.propTypes = {
  eachHistory: PropTypes.shape({
    location: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude:PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchHistoryItem;