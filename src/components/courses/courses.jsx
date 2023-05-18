import './courses.css'
import React, { useState } from 'react';

export default function CoursesComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelect = (event) => {
        setSelectedCategory(event.target.value);
    };

    const cards = [{ title: 'Card 1', category: 'Option 1', description: 'Description for Card 1', }, { title: 'Card 2', category: 'Option 2', description: 'Description for Card 2', }, { title: 'Card 3', category: 'Option 3', description: 'Description for Card 3', }, { title: 'Card 4', category: 'Option 4', description: 'Description for Card 4', }, { title: 'Card 5', category: 'Option 5', description: 'Description for Card 5', }, { title: 'Card 6', category: 'Option 1', description: 'Description for Card 6', },];

    const filteredCards = cards.filter((card) => {
        if (selectedCategory === 'All') {
            return card.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return (
                card.category === selectedCategory &&
                card.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    });

    const categories = ['All', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',];

    return (
        <div className="container courses">
            <div className="coursesWraper">
                <div className="row justify-content-center mt-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <div className="input-group-append">
                            <select
                                className="form-select"
                                onChange={handleSelect}
                                value={selectedCategory}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {filteredCards.map((card, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <div className="card mb-4">
                                <img
                                    src="assets/img1.jpg"
                                    className="card-img-top"
                                    alt={card.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn d-flex align-items-center like-button">
                                            <img
                                                src="assets/heart empty.png"
                                                alt="Empty Heart Icon"
                                                className="empty-heart-icon"
                                                width={20}
                                                height={20}
                                            />
                                            <img
                                                src="assets/heart.png"
                                                alt="Filled Heart Icon"
                                                className="filled-heart-icon"
                                                style={{ display: 'none' }}
                                                width={20}
                                                height={20}
                                            />
                                            <span className="ms-2">Like</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}