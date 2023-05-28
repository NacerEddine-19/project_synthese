import { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './projectComponent.css'; // Styling
export default function ProjectComponent() {
    const [projects, setProjects] = useState([
        { name: 'Project 1', team: 'Team A', language: 'JavaScript', likes: 0, dislikes: 0 },
        { name: 'Project 2', team: 'Team B', language: 'Python', likes: 0, dislikes: 0 },
        { name: 'Project 3', team: 'Team C', language: 'Java', likes: 0, dislikes: 0 },
    ]); // Array to store projects
    const [searchQuery, setSearchQuery] = useState(''); // Search bar query
    const [showAddForm, setShowAddForm] = useState(false); // Toggle add project form
    const [newProject, setNewProject] = useState({ // State for new project form fields
        name: '',
        team: '',
        file: null
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle file upload
    const handleFileUpload = (e) => {
        setNewProject({
            ...newProject,
            file: e.target.files[0]
        });
    };

    // Function to handle adding a new project
    const handleAddProject = () => {
        // Add form validation logic if needed
        setProjects([...projects, { ...newProject, likes: 0, dislikes: 0 }]);
        setNewProject({
            name: '',
            team: '',
            file: null
        });
        setShowAddForm(false);
    };

    // Function to handle liking a project
    const handleLike = (index) => {
        const updatedProjects = [...projects];
        updatedProjects[index].likes++;
        setProjects(updatedProjects);
    };

    // Function to handle disliking a project
    const handleDislike = (index) => {
        const updatedProjects = [...projects];
        updatedProjects[index].dislikes++;
        setProjects(updatedProjects);
    };

    // Function to filter projects based on search query
    const filteredProjects = projects.filter((project) => {
        const name = project.name.toLowerCase();
        const team = project.team.toLowerCase();
        return (
            name.includes(searchQuery.toLowerCase()) ||
            team.includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="project-component">
            <div className="header">
                <div className="upper-head">
                    <h1>Projects</h1>
                    <div className="searchbar">
                        <input
                            type="text"
                            placeholder="Search projects"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="add-project">
                    {!showAddForm ? (
                        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add Project</button>
                    ) : (
                        <div className="add-project-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Project Name"
                                value={newProject.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="team"
                                placeholder="Project Team"
                                value={newProject.team}
                                onChange={handleInputChange}
                            />
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileUpload}
                            />
                            <input
                                type="text"
                                name="language"
                                placeholder="Project Language"
                                value={newProject.language}
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-success" onClick={handleAddProject}>Save Project</button>
                            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="project-list">
                {filteredProjects.map((project, index) => (
                    <div className="project card" key={index}>
                        <div className="card-body">
                            <div className="card-info">
                                <div className="card-info-left">
                                    <h2 className="card-title">{project.name}</h2>
                                    <p className="card-text">Team: {project.team}</p>
                                    <p className
                                        ="card-text">Language: {project.language}</p>
                                </div>
                                <div className="card-info-right">
                                <button className="btn btn-primary" onClick={() => handleLike(index)}>
                                    <FaThumbsUp className="like-icon" />
                                </button>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={() => handleLike(index)}>
                                    <FaThumbsUp className="like-icon" />
                                    <span className="vote-count">{project.likes}</span>
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDislike(index)}>
                                    <FaThumbsDown className="dislike-icon" />
                                    <span className="vote-count">{project.dislikes}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}