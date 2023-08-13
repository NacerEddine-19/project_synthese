import { useState, useEffect, useCallback } from 'react';
import { FaThumbsUp, FaThumbsDown, FaFileDownload } from 'react-icons/fa';
import './projectComponent.css'; // Styling
import TagInputComponent from '../tagInput/tagInput';
import request from '../../utils/request';
import { getUser } from '../../utils/helper';
import LoadingIcon from '../loadingIcon/loadingIcon';

const API = process.env.REACT_APP_SERVER_API;
export default function ProjectComponent({ isEnd, isFetching, loading, data, deleteProject, fetchProjects }) {
    const [user] = useState(getUser());
    const [friends, setFriends] = useState([])
    const [suggestionsFriends, setSuggestionsFriends] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [suggestionsLanguages, setSuggestionsLanguages] = useState([]);
    const [user_id, setUser_id] = useState()
    const [projects, setProjects] = useState(data); // Array to store projects
    const [searchQuery, setSearchQuery] = useState(''); // Search bar query
    const [showAddForm, setShowAddForm] = useState(false); // Toggle add project form
    const [newProject, setNewProject] = useState({ // State for new project form fields
        name: '',
        users: [],
        languages: [],
        file: null
    });
    console.log({ projects });
    useEffect(() => {
        setUser_id(user?.id);
        return () => {
            setUser_id(null);
        };
    }, [user]);

    useEffect(() => {
        request.post(`${API}/friends`, {
            user_id
        })
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    return data;
                } else {
                    console.error('Error occurred during fetching friends');
                }
            }
            ).then(data => {
                setFriends(data);
            }
            )
        return () => {
            setFriends(null);
        };
    }, [user_id]);
    useEffect(() => {
        request.get(`${API}/languages`)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    // console.log({ data });
                    return data;
                } else {
                    console.error('Error occurred during fetching languages');
                }
            }
            ).then(data => {
                setLanguages(data);
            }
            )
        return () => {
            setLanguages([]);
        };
    }, []);
    // console.log({ languages });
    useEffect(() => {
        setProjects(data)
        return () => {
            setProjects(null)
        };
    }, [data]);

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
        if (newProject.name !== null && newProject.users !== null && newProject.languages !== null && newProject.file !== null) {
            setProjects([...projects, { ...newProject, likes: 0, dislikes: 0 }]);
            console.log({ newProject });
            try {
                // Make API request to store project
                request.post('/api/projects', newProject)
                    .then((response) => {
                        console.log('Project stored successfully!', response.data);
                        fetchProjects();
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
                users: [],
                languages: [],
                file: null
            });
            setShowAddForm(false);
        }
    };

    const handleDownload = () => {
        // Download button logic
    };

    const handleVote = (index, type) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects];
            const project = updatedProjects[index];

            if (type === 'like') {
                project.likes++;
            } else if (type === 'dislike') {
                project.dislikes++;
            }

            return updatedProjects;
        });
    };


    // Function to filter projects based on search query
    const filteredProjects = projects.filter((project) => {
        const name = project?.name?.toLowerCase();
        const users = project?.users?.map((user) => user?.nom?.toLowerCase());
        return (
            name?.includes(searchQuery.toLowerCase()) ||
            users?.some((user) => user?.includes(searchQuery.toLowerCase()))
        );
    });
    //handle tag change
    const handleTagsChange = useCallback((tags, property) => {
        setNewProject((prevProject) => ({
            ...prevProject,
            [property]: tags.map((tag) => tag.id),
        }));
    }, []);
    // console.log({friends});
    useEffect(() => {
        setSuggestionsFriends(friends?.map(user => {
            return {
                id: `${user?.id}`,
                text: `${user?.nom}`
            }
        }) || []);
        setSuggestionsLanguages(languages?.map(lang => {
            return {
                id: `${lang?.id}`,
                text: `${lang?.name}`
            }
        }) || []);

        return () => {
            setSuggestionsFriends([]);
            setSuggestionsLanguages([]);
        };
    }, [friends, languages]);

    //pagination

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
                                placeholder={'Project team'}
                                name={'users'}
                                handleTagsChange={(tags) => handleTagsChange(tags, 'users')}
                                suggestionsFriends={suggestionsFriends}
                            />
                            <TagInputComponent
                                placeholder={'Project Languages'}
                                name={'languages'}
                                handleTagsChange={(tags) => handleTagsChange(tags, 'languages')}
                                suggestionsLanguages={suggestionsLanguages}
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
            {loading && !isFetching ? (<LoadingIcon />) : (
                <div className="project-list">
                    {filteredProjects.map((project, index) => (
                        <div className="project card" key={index}>
                            <div className="card-body">
                                <div className="card-info">
                                    <div className="card-info-left">
                                        <h2 className="card-title">{project.name}</h2>
                                        <p className="card-text">users: {project.users?.map((member, idx) => (<span key={idx}>{member.nom}</span>))}</p>
                                        <p className="card-text">Languages: {project.languages?.map((lang, idx) => (<span key={idx}>{lang.name}</span>))}</p>
                                    </div>
                                    <div className="card-info-right">
                                        <button className="btn btn-success" onClick={handleDownload}>
                                            <FaFileDownload className="download-icon" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary" onClick={() => handleVote(index, 'like')}>
                                        <FaThumbsUp className="like-icon" />
                                        <span className="vote-count">{project.likes}</span>
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleVote(index, 'dislike')}>
                                        <FaThumbsDown className="dislike-icon" />
                                        <span className="vote-count">{project.dislikes}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isFetching ? (
                <LoadingIcon />
            ) : isEnd ? (
                <div>Feeling inspired? Create your own Project!</div>
            ) : ''}
        </div>
    );
}
