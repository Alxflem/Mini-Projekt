import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Search here" className="search-bar-input" />
    </div>
  );
};

export default SearchBar;