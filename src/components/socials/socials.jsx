import { useState } from "react";
import { getUser, setUser } from "../../utils/helper";

export default function Socials() {

    const [user] = useState(getUser());
    const pathname = window.location.pathname;
    const [websiteLink, setWebsiteLink] = useState(user?.site);
    const [githubLink, setGitHubLink] = useState(user?.github);
    const [twitterLink, setTwitterLink] = useState(user?.x);
    const [instagramLink, setInstagramLink] = useState(user?.instagram);
    const [facebookLink, setFacebookLink] = useState(user?.facebook);
    // const [userInfo, setUserInfo] = useState(null);
    // const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "website":
                setWebsiteLink(value);
                break;
            case "github":
                setGitHubLink(value);
                break;
            case "x":
                setTwitterLink(value);
                break;
            case "instagram":
                setInstagramLink(value);
                break;
            case "facebook":
                setFacebookLink(value);
                break;
            default:
                break;
        }
    };
    // const handleSaveChanges = async () => {
    //     console.log("Saving changes...");
    //     const updatedUser = {
    //         ...user,
    //         site: websiteLink,
    //         github: githubLink,
    //         x: twitterLink,
    //         instagram: instagramLink,
    //         facebook: facebookLink,
    //     };
    //     const req = await setUser(updatedUser);
    //     console.log(req);
    // };

    return (
        <div className="card mt-3">
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-globe mr-2 icon-inline"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        Website
                    </h6>
                    {!pathname.includes('/edit') ? (
                        <>

                            {websiteLink ? <a
                                rel="noreferrer"
                                target="_blank"
                                href={websiteLink}
                                className="text-secondary"
                            >
                                {user?.nom}
                            </a> : null}
                        </>
                    ) : <input
                        type="text"
                        name="website"
                        className="form-control"
                        onChange={handleInputChange}
                        value={websiteLink}
                        placeholder="enter your website link" />
                    }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github mr-2 icon-inline"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Github
                    </h6>
                    {!pathname.includes('/edit') ? (
                        <>

                            {githubLink ? <a
                                rel="noreferrer"
                                target="_blank"
                                href={githubLink}
                                className="text-secondary"
                            >
                                {user?.nom}
                            </a> : null}
                        </>
                    ) : <input
                        type="text"
                        name="github"
                        className="form-control"
                        onChange={handleInputChange}
                        value={githubLink}
                        placeholder="enter your github link" />
                    }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 300 300"
                            stroke="currentColor"
                            strokeWidth="5"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
                        </svg>
                        Twitter
                    </h6>
                    {!pathname.includes('/edit') ? (
                        <>

                            {twitterLink ? <a
                                rel="noreferrer"
                                target="_blank"
                                href={twitterLink}
                                className="text-secondary"
                            >
                                {user?.nom}
                            </a> : null}
                        </>
                    ) : <input
                        type="text"
                        name="x"
                        className="form-control"
                        onChange={handleInputChange}
                        value={twitterLink}
                        placeholder="enter your x link" />
                    }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram mr-2 icon-inline text-danger"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                    </h6>
                    {!pathname.includes('/edit') ? (
                        <>

                            {instagramLink ? <a
                                rel="noreferrer"
                                target="_blank"
                                href={instagramLink}
                                className="text-secondary"
                            >
                                {user?.nom}
                            </a> : null}
                        </>
                    ) : <input
                        type="text"
                        name="instagram"
                        className="form-control"
                        onChange={handleInputChange}
                        value={instagramLink}
                        placeholder="enter your instagram link" />
                    }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-facebook mr-2 icon-inline text-primary"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        Facebook
                    </h6>
                    {!pathname.includes('/edit') ? (
                        <>

                            {facebookLink ? <a
                                rel="noreferrer"
                                target="_blank"
                                href={facebookLink}
                                className="text-secondary"
                            >
                                {user?.nom}
                            </a> : null}
                        </>
                    ) : <input
                        type="text"
                        name="facebook"
                        className="form-control"
                        onChange={handleInputChange}
                        value={facebookLink}
                        placeholder="enter your facebook link" />
                    }
                </li>
            </ul>
            {/* {pathname.includes("/edit") && (
                <button className="btn btn-primary mt-3" onClick={handleSaveChanges}>
                    Save
                </button>
            )} */}
        </div>
    );
}
