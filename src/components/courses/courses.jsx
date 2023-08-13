import { Favorite, FavoriteBorderRounded } from '@material-ui/icons';
import './courses.css'
import React, { useState } from 'react';

export default function CoursesComponent({profile}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cards, setCards] = useState([
        {
            title: "Introduction to Python",
            description: "Learn the basics of Python programming language.",
            image: "python.jpg",
            category: "Programming",
            isLiked: false
        },
        {
            title: "Web Development Fundamentals",
            description: "Get started with web development using HTML, CSS, and JavaScript.",
            image: "webdev.jpg",
            category: "Web Development",
            isLiked: false
        },
        {
            title: "Data Science with R",
            description: "Explore data analysis and visualization using R programming.",
            image: "datascience.jpg",
            category: "Data Science",
            isLiked: false
        },
        {
            title: "Mobile App Development with React Native",
            description: "Build cross-platform mobile applications using React Native framework.",
            image: "mobiledev.jpg",
            category: "Mobile Development",
            isLiked: false
        },
        {
            title: "Introduction to Machine Learning",
            description: "Discover the fundamentals of machine learning algorithms and techniques.",
            image: "machinelearning.jpg",
            category: "Data Science",
            isLiked: false
        },
        {
            title: "UI/UX Design Principles",
            description: "Learn the principles and best practices of user interface and user experience design.",
            image: "uiux.jpg",
            category: "Design",
            isLiked: false
        },
        {
            title: "Cloud Computing Fundamentals",
            description: "Get an overview of cloud computing concepts and technologies.",
            image: "cloud.jpg",
            category: "Cloud Computing",
            isLiked: false
        },
        {
            title: "Cybersecurity Essentials",
            description: "Explore the essential concepts and practices of cybersecurity.",
            image: "hack.jpg",
            category: "Security",
            isLiked: false
        },
        {
            title: "Digital Marketing Strategies",
            description: "Learn effective digital marketing strategies for online businesses.",
            image: "marketing.jpg",
            category: "Marketing",
            isLiked: false
        },
        {
            title: "Artificial Intelligence and Ethics",
            description: "Explore the ethical considerations in artificial intelligence and machine learning.",
            image: "ai.jpg",
            category: "Data Science",
            isLiked: false
        },
        // Additional items for each category
        {
            title: "Advanced Python Programming",
            description: "Dive deeper into advanced Python concepts and techniques.",
            image: "python.jpg",
            category: "Programming",
            isLiked: false
        },
        {
            title: "Responsive Web Design",
            description: "Learn how to create responsive and mobile-friendly websites.",
            image: "webdev.jpg",
            category: "Web Development",
            isLiked: false
        },
        {
            title: "Data Visualization with Python",
            description: "Master the art of visualizing data using Python libraries.",
            image: "datascience.jpg",
            category: "Data Science",
            isLiked: false
        },
        {
            title: "iOS App Development",
            description: "Build native iOS applications using Swift and Xcode.",
            image: "ios.jpg",
            category: "Mobile Development",
            isLiked: false
        },
        {
            title: "Natural Language Processing",
            description: "Explore techniques for analyzing and processing natural language data.",
            image: "datascience.jpg",
            category: "Data Science",
            isLiked: false
        },
        {
            title: "User Experience Research",
            description: "Learn how to conduct user research and gather insights for UX design.",
            image: "uiux.jpg",
            category: "Design",
            isLiked: false
        },
        {
            title: "Cloud Security and Compliance",
            description: "Understand security practices and compliance considerations in cloud computing.",
            image: "cloud.jpg",
            category: "Cloud Computing",
            isLiked: false
        },
        {
            title: "Network Security",
            description: "Master the concepts and techniques of network security.",
            image: "hack.jpg",
            category: "Security",
            isLiked: false
        },
        {
            title: "Social Media Marketing",
            description: "Harness the power of social media platforms for effective marketing campaigns.",
            image: "marketing.jpg",
            category: "Marketing",
            isLiked: false
        },
        {
            title: "Ethical AI Development",
            description: "Develop AI systems with a focus on ethical considerations and responsible AI practices.",
            image: "ai.jpg",
            category: "Data Science",
            isLiked: false
        }
    ]);

    const handleLikeClick = (index) => {
        const updatedCards = [...cards];
        updatedCards[index].isLiked = !updatedCards[index].isLiked;
        setCards(updatedCards);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelect = (event) => {
        setSelectedCategory(event.target.value);
    };


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

    const categories = [
        "All",
        "Programming",
        "Web Development",
        "Data Science",
        "Mobile Development",
        "Design",
        "Cloud Computing",
        "Security",
        "Marketing"
    ]
        ;

    return (
        <div className="container courses">
            {profile && (<><h1>this is still under work</h1></>)}
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
                                    src={`assets/courses/` + card.image}
                                    className="card-img-top"
                                    alt={card.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn d-flex align-items-center like-button" onClick={() => handleLikeClick(index)}>
                                            {!card?.isLiked ? (
                                                <FavoriteBorderRounded />
                                            ) : (
                                                <Favorite style={{ color: 'red' }} />
                                            )
                                            }
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