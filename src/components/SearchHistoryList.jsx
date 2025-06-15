import SearchHistoryItem from "./SearchHistoryItem";

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

export default SearchHistoryList;