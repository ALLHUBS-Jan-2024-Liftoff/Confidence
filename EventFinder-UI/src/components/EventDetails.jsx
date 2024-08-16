import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EventDetails.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const EventDetails = () => {
    const [showRsvpPopup, setShowRsvpPopup] = useState(null);
    const [favoriteEvents, setFavoriteEvents] = useState([]); // State to track user's favorite events
    
    const [data, setData] = useState([]); // State to store fetched event data
    const [filteredData, setFilteredData] = useState([]); // State to store filtered event data
    const [error, setError] = useState(null); // State to handle errors during data fetching
    const [searchTerm, setSearchTerm] = useState(''); // State to manage search term for event filtering
    const [filters, setFilters] = useState({ // State to manage various filters
        category: '',
        startDate: '',
        endDate: '',
        location: '',
        cityzip: '',
        minPrice: '',
        maxPrice: ''
    });
    const [rsvpStatuses, setRsvpStatuses] = useState({}); // State to manage RSVP status
    const { user, addFavorite, removeFavorite, fetchFavorites } = useAuth(); // Get user and addFavorite from AuthContext

    // Fetch data from API on initial component mount
    useEffect(() => {
        fetchData();
        if (user) {
            loadFavorites();
        }
    }, [user]);

       // Function to load user's favorite events
       // Function to load user's favorite events
const loadFavorites = async () => {
    try {
        const favorites = await fetchFavorites(user.id);
        // If favorites is undefined, use an empty array as a fallback
        setFavoriteEvents(favorites ? favorites.map(fav => fav.id) : []);
    } catch (error) {
        console.error('Error fetching favorite events:', error);
        setFavoriteEvents([]); // Ensure the state is at least an empty array to prevent further errors
    }
};

    // Function to fetch event data from API
    const fetchData = () => {
        axios.get('http://localhost:8080/api/events')
            .then(res => {
                console.log('Fetched data:', res.data); // Log the fetched data
                setData(res.data); // Set fetched data to state
                setFilteredData(res.data); // Initially set filteredData to all data
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again later.'); // Handle fetch error
            });
    };

    // Function to handle adding an event to favorites
    const handleAddFavorite = async (eventId) => {
        try {
            await addFavorite(user.id, eventId);
            setFavoriteEvents([...favoriteEvents, eventId]); // Add the event ID to the favoriteEvents array
        } catch (error) {
            console.error('An error occurred while adding the event to favorites.', error);
        }
    };
    
      // Function to handle removing an event from favorites
      const handleRemoveFavorite = async (eventId) => {
        try {
            await removeFavorite(user.id, eventId);
            setFavoriteEvents(favoriteEvents.filter(id => id !== eventId)); // Remove the event ID from the favoriteEvents array
        } catch (error) {
            console.error('An error occurred while removing the event from favorites.', error);
        }
    };
    
    
    
    // Effect to apply filters whenever filters state changes
    useEffect(() => {
        applyFilters();
    }, [filters]);

    // Function to apply filters to event data
    const applyFilters = () => {
        let filtered = [...data]; // Create a copy of original data array

        // Apply category filter
        if (filters.category) {
            filtered = filtered.filter(event => event.eventCategory === filters.category);
        }

        // Apply date range filter (assuming events have a date field)
        if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(event =>
                new Date(event.eventDate) >= new Date(filters.startDate) &&
                new Date(event.eventDate) <= new Date(filters.endDate)
            );
        }

        // Apply location filter
        if (filters.location) {
            filtered = filtered.filter(event => event.eventLocation.toLowerCase().includes(filters.location.toLowerCase()));
        }

        // Apply cityzip filter
        if (filters.cityzip) {
            filtered = filtered.filter(event => event.eventCityzip.toLowerCase().includes(filters.cityzip.toLowerCase()));
        }

        // Apply price range filter (assuming events have a price field)
        if (filters.minPrice && filters.maxPrice) {
            filtered = filtered.filter(event =>
                event.eventPrice >= parseFloat(filters.minPrice) &&
                event.eventPrice <= parseFloat(filters.maxPrice)
            );
        }

        setFilteredData(filtered); // Update filteredData state with filtered array
    };

    // Handler function for search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Update search term state
    };

    // Effect to filter data based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredData(data); // Reset filteredData if search term is empty
        } else {
            const filtered = data.filter(event =>
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventcityzip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventCategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered); // Update filteredData based on search term
        }
    }, [searchTerm, data]);

    // Function to clear all filters and search term
    const clearFilters = () => {
        setFilters({ // Reset filters state
            category: '',
            startDate: '',
            endDate: '',
            location: '',
            cityzip: '',
            minPrice: '',
            maxPrice: ''
        });
        setSearchTerm(''); // Reset search term state
    };

    // Function to format time from array [hours, minutes] to HH:MM format
    const formatTime = (timeArray) => {
        try {
            if (!Array.isArray(timeArray) || timeArray.length !== 2) {
                return '';
            }
            const [hours, minutes] = timeArray;
            const time = new Date();
            time.setHours(hours);
            time.setMinutes(minutes);
            return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        } catch (error) {
            console.error('Error formatting time:', error);
            return '';
        }
    };

    // Function to convert base64 image string to URL
    const base64ToImageUrl = (base64String, mimeType) => {
        if (!base64String) return ''; // Handle case where base64String is not available
        // Construct the data URL
        return `data:${mimeType};base64,${base64String}`;
    };

    const handleRsvpUpdate = async (eventId, status) => {
        try {
            await axios.post(`http://localhost:8080/api/events/${eventId}/rsvp`, null, {
                params: {
                    userId: user.id,
                    status: status
                }
            });
            setRsvpStatuses(prevStatuses => ({ ...prevStatuses, [eventId]: status }));
        } catch (error) {
            console.error("There was an error updating the RSVP status!", error);
        }
    };

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!data.length && !error && <div className="alert alert-info">Loading...</div>}

                    <div className='mb-3'>
                        <h1 className='text-primary'>Event Finder</h1>
                        <div className='mb-3'>
                            <Link to="/about" className="btn btn-primary me-2">About</Link>
                            <Link to="/contact" className="btn btn-secondary">Contact</Link>
                        </div>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search events...'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-3'>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Start Date'
                                value={filters.startDate}
                                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            />
                        </div>
                        <div className='col-md-3'>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='End Date'
                                value={filters.endDate}
                                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            />
                        </div>
                        <div className='col-md-3'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Location'
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            />
                        </div>
                        <div className='col-md-3'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Zip Code'
                                value={filters.cityzip}
                                onChange={(e) => setFilters({ ...filters, cityzip: e.target.value })}
                            />
                        </div>
                        <div className='col-md-3'>
                            <div className='input-group'>
                                <span className='input-group-text'>$</span>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Min Price'
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                />
                                <span className='input-group-text'>to $</span>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Max Price'
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row row-cols-1 row-cols-md-2 g-4'>
                        {filteredData.map((event, index) => (
                            <div key={index} className='col'>
                                <div className='card'>
                                    <img
                                        src={base64ToImageUrl(event.eventImage, event.imageMimeType)}
                                        className='card-img-top'
                                        alt={event.eventName}
                                    />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{event.eventName}</h5>
                                        <p className='card-text'><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                                        <p className='card-text'><strong>Time:</strong> {formatTime(event.eventTime)}</p>
                                        <p className='card-text'><strong>Venue:</strong> {event.eventLocation}</p>
                                        <p className='card-text'><strong>City and Zip Code:</strong> {event.eventCityzip}</p>
                                        <p className='card-text'><strong>Description:</strong> {event.description}</p>
                                        <p className='card-text'><strong>Category:</strong> {event.eventCategory}</p>
                                        <p className='card-text'><strong>Price:</strong> ${event.eventPrice.toFixed(2)}</p>

                                        <p className='card-text'><strong>Approval Status:</strong> {event.approvalStatus}</p>
                                        <button className='btn btn-primary' onClick={() => fetchAndUpdateApprovalStatus(event.id)}>Approve Event</button>
                                        {user && (<>
                                            <p className='card-text'><strong>RSVP status:</strong></p>
                                            <p>{rsvpStatuses[event.id] || 'No RSVP'}</p>
                                            <button
                                                className='btn btn-success'
                                                onClick={() => setShowRsvpPopup(event.id)}
                                            >
                                                RSVP
                                            </button>
                                            {favoriteEvents.includes(event.id) ? (
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => handleRemoveFavorite(event.id)}
                                                >
                                                    Remove Favorite
                                                </button>
                                            ) : (
                                                <button
                                                    className='btn btn-secondary'
                                                    onClick={() => handleAddFavorite(event.id)}
                                                >
                                                    Add to Favorites
                                                </button>
                                            )}
                                        </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-3'>
                        <button className='btn btn-secondary me-2' onClick={clearFilters}>Clear Filters</button>
                    </div>
                </div>
            </div>

            {showRsvpPopup && (
                <div className="rsvp-popup">
                    <div className="rsvp-popup-content">
                        <h3>Change RSVP Status</h3>
                        <select
                            value={rsvpStatuses[showRsvpPopup] || 'none'}
                            onChange={(e) => handleRsvpUpdate(showRsvpPopup, e.target.value)}
                            className="form-select"
                        >
                            <option value="none">No RSVP</option>
                            <option value="attending">Attending</option>
                            <option value="not attending">Not Attending</option>
                            <option value="interested">Interested</option>
                        </select>
                        <button
                            onClick={() => setShowRsvpPopup(null)}
                            className="button-close"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;