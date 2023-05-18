import { useState } from 'react';
import events from '../../event.json';
import './events.css'

export default function Events() {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const uniqueCategories = Array.from(new Set(events.events.map((item) => item.categorie)));

  const filteredEvents = events.events.filter((item) => {
    const isCategoryMatch = selectedCategory === 'All' || item.categorie === selectedCategory;
    const isTitleMatch = item.title.toLowerCase().includes(filter.toLowerCase());
    return isCategoryMatch && isTitleMatch;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className='events-component'>
      <div className="input-group">
        <input
          type="text"
          placeholder="Filter by title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select className='form-select' value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          {uniqueCategories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="events">
        {filteredEvents.map((item, index) => (
          <div className="event" key={index}>
            <div className="img-container">
              <img src={item.img} alt={index} />
            </div>
            <div className="information-container">
              <h2>{item.title}</h2>
              <h3>{item.date}</h3>
              <h5>
                {item.platform} | {item.time}
              </h5>
              <h5>{item.categorie}</h5>
              <button className="btn btn-block">JOIN</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
