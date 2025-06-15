import SearchHistoryItem from "./SearchHistoryItem";
import PropTypes from 'prop-types';

const SearchHistoryList = (props) => {
    console.log('SearchHistory');

    const historyComponents = () => {
        console.log();
        return props.searchHistoryList.map((eachHistory, key) => {
            return <SearchHistoryItem key={key} eachHistory={eachHistory}/>;
        });
    };

    return (
        <section>
           <h2>Search History</h2>
           <div>{historyComponents()}</div>
        </section>

    );
};

SearchHistoryList.propTypes = {
  searchHistoryList: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude:PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchHistoryList;