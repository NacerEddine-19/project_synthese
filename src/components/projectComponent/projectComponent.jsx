import { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaFileDownload } from 'react-icons/fa';
import './projectComponent.css'; // Styling
import TagInputComponent from '../tagInput/tagInput';
import request from '../../utils/request';

export default function ProjectComponent() {
    const API = process.env.REACT_APP_SERVER_API;
    const [projects, setProjects] = useState([
        { name: 'Project 1', team: ['Omar', 'Nacer', 'Ryad', 'Mouhcine'], languages: ['py', 'js', 'html', 'React'], likes: 5, dislikes: 1, file: null },
        { name: 'Project 2', team: ['Oussama', 'Nacer', 'Majdi', 'Hiba'], languages: ['py', 'js', 'html', 'React'], likes: 5, dislikes: 1, file: null },
        { name: 'Project 3', team: ['Oumaima', 'Taha', 'Anass', 'Imad'], languages: ['py', 'js', 'html', 'React'], likes: 5, dislikes: 1, file: null },
    ]); // Array to store projects
    const [searchQuery, setSearchQuery] = useState(''); // Search bar query
    const [showAddForm, setShowAddForm] = useState(false); // Toggle add project form
    const [newProject, setNewProject] = useState({ // State for new project form fields
        name: '',
        team: [],
        languages: [],
        file: null
    });
    console.log({ projects });

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
        if (newProject.name !== null && newProject.team !== null && newProject.languages !== null && newProject.file !== null) {
            setProjects([...projects, { ...newProject, likes: 0, dislikes: 0 }]);
            console.log({ newProject });
            try {
                // Make API request to store project
                request.post('/api/projects', newProject)
                    .then((response) => {
                        console.log('Project stored successfully!', response.data);
                        // Handle success, such as displaying a success message or redirecting
                    })
                    .catch((error) => {
                        console.error('Error storing project:', error);
                        // Handle error, such as displaying an error message
                    });
            } catch {

            }
            setNewProject({
                name: '',
                team: [],
                languages: [],
                file: null
            });
            setShowAddForm(false);
        }
    };

    const handleDownload = () => {
        // Download button logic
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
        const team = project.team.map((user) => user.toLowerCase());
        return (
            name.includes(searchQuery.toLowerCase()) ||
            team.some((user) => user.includes(searchQuery.toLowerCase()))
        );
    });

    //handle tag change
    const handleTagsChange = (tags, property) => {
        setNewProject({
            ...newProject,
            [property]: tags.map((tag) => tag.text),
        });
    };

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
                        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                            Add Project
                        </button>
                    ) : (
                        <div className="add-project-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Project Name"
                                value={newProject.name}
                                onChange={handleInputChange}
                            />
                            <TagInputComponent
                                placeholder={'Project Team'}
                                name={'team'}
                                handleTagsChange={(tags) => handleTagsChange(tags, 'team')}
                            />
                            <TagInputComponent
                                placeholder={'Project Languages'}
                                name={'languages'}
                                handleTagsChange={(tags) => handleTagsChange(tags, 'languages')}
                            />
                            <input
                                type="file"
                                name="file"
                                accept=".zip"
                                onChange={handleFileUpload}
                            />
                            <button className="btn btn-success" onClick={handleAddProject}>
                                Save Project
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                                Cancel
                            </button>
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
                                    <p className="card-text">Team: {project.team?.map((member, idx) => (<span key={idx}>{member}</span>))}</p>
                                    <p className="card-text">Languages: {project.languages?.map((lang, idx) => (<span key={idx}>{lang}</span>))}</p>
                                </div>
                                <div className="card-info-right">
                                    <button className="btn btn-success" onClick={handleDownload}>
                                        <FaFileDownload className="download-icon" />
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
