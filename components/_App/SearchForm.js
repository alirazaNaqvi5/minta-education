import React from 'react'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const SearchForm = () => {

    const [search, setSearch] = React.useState({search: ''})
    const {t} = useTranslation("distance-learning")
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSearch(prevState => ({...prevState, [name]: value}) )

        // console.log("dsddsd")
    }

    const handleSearch = (e) => {
        e.preventDefault()
        Router.push({
            pathname: '/courses/search',
            query: {q: search.search}
        })
    }

    return (
        <form className="search-box" onSubmit={handleSearch}>
            <input 
                type="text" 
                className="input-search" 
                placeholder={t["search-placeholder"]}
                name='search'
                value={search.search}
                onChange={handleOnChange}
            />
            <button type="submit">
                <i className="flaticon-search"></i>
            </button>
        </form>
    )
}

export default SearchForm
