const RecentSearches = ({ searchHistory = [], onRecentSearchClick }) => {
  return (
    <div className="previous-searches">
      <h3 className="searches-title">Recent Searches</h3>
      <div className="search-history" id="searchHistory">
        {searchHistory.length > 0 &&
          searchHistory.map((history, index) => (
            <span
              key={index}
              className="search-tag"
              onClick={() => onRecentSearchClick(history)}
            >
              {capitalizeFirstLetter(history)}
            </span>
          ))}
      </div>
    </div>
  );
};

const capitalizeFirstLetter = word =>
  word.charAt(0).toUpperCase() + word.slice(1);

export default RecentSearches;
