import React, {useState} from "react";

function Search({onFilter}) {
    const initSearch = { title: '' }
    const [addSearch, setSearch] = useState(initSearch);

    const handleFilter = (e) => {
        setSearch({[e.target.name]: e.target.value});
        console.log(e.target.value);
        onFilter(e.target.value)
    }


    return (
        <p>
            <input type="text"
                name="title"
                placeholder='Hae'
                onChange={handleFilter}>
            </input>
        </p>



    )
}

export default Search