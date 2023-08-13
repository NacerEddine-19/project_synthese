import './editProfile.css'
import { getUser } from '../../../utils/helper';
import { useState, useEffect, useMemo } from 'react';
import Socials from '../../../components/socials/socials';
import request from '../../../utils/request';
import { Autocomplete, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

export function EditProfile() {
    const locat = useLocation();
    const tab = locat.search.slice(5);
    const [user] = useState(getUser());
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')
    const [bio, setBio] = useState(user?.bio || '');
    const [city, setCity] = useState(user?.city || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cities, setCities] = useState([]);
    const [activeTab, setActiveTab] = useState(tab || 'general');
    async function getCities() {
        const options = {
            method: 'POST',
            url: 'https://countriesnow.space/api/v0.1/countries/cities',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "country": "morocco"
            }
        };
        let response = await request.request(options);
        const newCities = response.data.data.map(city => ({ label: `${city}`, id: response.data.data.indexOf(city) }));

        const uniqueCities = [];
        const cityNamesSet = new Set();

        newCities.forEach(city => {
            if (!cityNamesSet.has(city.label)) {
                cityNamesSet.add(city.label);
                uniqueCities.push(city);
            }
        });

        setCities(uniqueCities);
    }
    useEffect(() => {
        getCities()
        return () => {
            setCities([])
        }
    }, [])
    useEffect(() => {
        setActiveTab(tab || 'general');
    }, [tab]);
    const memoizedCities = useMemo(() => cities, [cities]);
    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handleBioChange = (e) => {
        setBio(e.target.value)
    }
    const handleCityChange = (newValue) => {
        setCity(newValue)
    }
    useEffect(() => {

        console.log({ city });
        console.log(cities.indexOf(city));

    }, [city, phoneNumber]);

    return (
        <>

            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row"> <div className="col-md-3 border-right">

                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle" width={150} height={150} src={user?.pdp} alt='profile pic' />
                        <span className="font-weight-bold">{user?.nom} {user?.prenom}</span>
                        <span> </span></div> </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>

                            {/* general */}
                            {activeTab === 'general' && (
                                <>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <TextField
                                                id="outlined-read-only-input"
                                                className="form-control"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                defaultValue={user?.nom}
                                                label="First name"
                                                variant="outlined" />
                                        </div>
                                        <div className="col-md-6">
                                            <TextField
                                                id="outlined-read-only-input"
                                                className="form-control"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                defaultValue={user?.prenom}
                                                label="Last name"
                                                variant="outlined" />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <TextField
                                                id="outlined-required"
                                                className="form-control"
                                                defaultValue={phoneNumber}
                                                onChange={(e) => handlePhoneChange(e)}
                                                label="Phone number"
                                                variant="outlined" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <Autocomplete
                                            value={{ label: city, id: cities.indexOf(city) }}
                                            onChange={(e, newValue) => handleCityChange(newValue)}
                                            inputValue={city}
                                            // onInputChange={(event, newInputValue) => {
                                            //     setCity(newInputValue);
                                            // }}
                                            disablePortal
                                            className="form-control"
                                            id="combo-box-demo"
                                            options={memoizedCities}
                                            sx={{ width: 300 }}
                                            // defaultValue={{ label: city, id: cities.indexOf(city) }}
                                            getOptionLabel={(option) => option.label}
                                            isOptionEqualToValue={(option, value) => option.lable === value}
                                            onInputChange={(e, newValue) => handleCityChange(newValue)}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="City"
                                                />}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            id="outlined-required"
                                            className="form-control"
                                            defaultValue={bio}
                                            onChange={(e) => handleBioChange(e)}
                                            label="Bio"
                                            variant="outlined" />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            id="outlined-read-only-input"
                                            className="form-control"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            defaultValue={user?.school}
                                            label="School"
                                            variant="outlined" />
                                    </div>
                                </>
                            )}
                            {/* security */}
                            {activeTab === 'security' && (
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <TextField
                                            id="outlined-read-only-input"
                                            className="form-control"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            defaultValue={user?.email}
                                            label="Email"
                                            variant="outlined" />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            id="outlined-required"
                                            className="form-control"
                                            defaultValue={oldPassword}
                                            onChange={(e) => handleOldPasswordChange(e)}
                                            label="Password"
                                            variant="outlined" />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            id="outlined-required"
                                            className="form-control"
                                            defaultValue={newPassword}
                                            onChange={(e) => handleNewPasswordChange(e)}
                                            label="New Password"
                                            variant="outlined" />
                                    </div>
                                </div>)}
                            {/* socials */}
                            {activeTab === 'socials' && (
                                <div className="row mt-3">
                                    <div className="p-3 py-5">
                                        < Socials />
                                    </div>
                                </div>)}
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}