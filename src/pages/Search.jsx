import React from "react";
import SearchDropdown from "../components/SearchDropdown";
import SearchDropdownFuse from "../components/SearchDropdownFuse";

const Search = (props) => {
  const { movies } = props;

  return (
    /*이 아래 부분은 SearchDropdown을 보기위해 임의로 렌더링한 코드 = 필요없으시면 지우셔도 됩니다.*/
    <div>
      <SearchDropdown input={"간시"} movies={movies} />
      <SearchDropdownFuse input={"간시"} movies={movies} />
    </div>
  );
};

export default Search;
