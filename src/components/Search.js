import React from 'react';

const Search = (props) =>{
    return(
        <section role='search' className='search'>
        <h1>News Api's</h1>
            <form form-label='seachform'>
                <label htmlFor='search'>Search</label>
                <input role='textbox' aria-label='searchbox' id='search' type="text" name='search' onChange={props.change} placeholder="Seach News here"></input>
            </form>
        </section>
    )
}

export default Search;