import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    const dataFetch = async () => {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API}&q=${search}&limit=12&offset=0&rating=G&lang=${language}`);
      const resJson = await response.json();
      const resData = await resJson.data;;
      setItems(resData);
    }

    if(query !== '') {
      dataFetch();
    }

  }, [query, language]);

  return (
    <div className="app">
      <h2>Search gifs</h2>
      <form className="search" onSubmit={e => {
        e.preventDefault();
        setQuery(search)
      }}>
      <select 
          className="search__language"
          name="lang" 
          value={language}
          onChange={e => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="pl">Polish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <div className="search__arrow"></div>
        <input
          className="search__input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search gifs"
        />
        <button className="search__btn" type="submit">Search</button>
      </form>
      <div className="result">
        <ul className="result__list">
          {items.map(item => (
            <li key={item.id}>
              <video autoPlay loop src={item.images.fixed_height.mp4} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
