import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Photos.css';


function Photos() {

    const [photos, setPhotos] = useState([]);
    const [loadMoreVisible, setLoadMoreVisible] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [newPhotoData, setNewPhotoData] = useState({ title: '', thumbnailUrl: '' });
    const params = useParams()

    useEffect(() => {
        fetchPhotos(0, 16);
    }, [params.albumId]);

    const fetchPhotos = (start, limit) => {
        fetch(`http://localhost:3000/photos?albumId=${params.albumId}&_start=${start}&_limit=${limit}`)
            .then((res) => res.json())
            .then((newPhotos) => {
                if (newPhotos.length === 0) {
                    setLoadMoreVisible(false);
                }
                setPhotos([...photos, ...newPhotos]);
                setStartIndex(start + limit);
            })
            .catch((error) => console.error('Error fetching photos:', error));
    };

    const handleSeeMore = () => {
        fetchPhotos(startIndex, 16);
    };

    const handleUpdateClick = photo => {
        setSelectedPhoto(photo);
        setNewPhotoData({ title: photo.title, thumbnailUrl: photo.thumbnailUrl });
        setUpdateModalOpen(true);
    };

    const handleAddClick = () => {
        setNewPhotoData({ title: '', thumbnailUrl: '' });
        setAddModalOpen(true);
    };

    const handleSaveAdd = () => {
        fetch('http://localhost:3000/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                albumId: params.albumId,
                id: '',
                title: newPhotoData.title,
                url: '',
                thumbnailUrl: newPhotoData.thumbnailUrl
            }),
        })
            .then(response => response.json())
            .then(newPhoto => {
                setPhotos([...photos, newPhoto]);
            })
            .catch(error => console.error('Error adding photo:', error));
        setAddModalOpen(false);
    };

    const handleSaveUpdate = () => {
        fetch(`http://localhost:3000/photos/${selectedPhoto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                albumId: params.albumId,
                id: '',
                title: newPhotoData.title,
                url: selectedPhoto.url,
                thumbnailUrl: newPhotoData.thumbnailUrl
            }),
        })
            .then(response => {
                if (response.ok) {
                    const updatedPhotos = photos.map(photo => {
                        return photo.id === selectedPhoto.id ? { ...photo, title: newPhotoData.title, thumbnailUrl: newPhotoData.thumbnailUrl } : photo;
                    });
                    setPhotos(updatedPhotos);
                    setUpdateModalOpen(false);
                } else {
                    console.error('Error updating photo:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error updating photo:', error.message);
            });
    };

    const handleCloseModal = () => {
        setUpdateModalOpen(false);
        setAddModalOpen(false);
    };

    const handleDeletePhoto = (photoId) => {
        fetch(`http://localhost:3000/photos/${photoId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
                    setPhotos(updatedPhotos);
                } else {
                    console.error('Error deleting photo:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting photo:', error.message);
            });
    };


    const photoElements = photos.map((photo) => (
        <div key={photo.id} className="photo-tile">
            <div className="photo-info">
                <h3>{photo.id}</h3>
                <p>{photo.title}</p>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <div className="button-container">
                    <button onClick={() => handleUpdateClick(photo)}>Update</button>
                    <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
                </div>
            </div>
        </div>
    ));

    return (
        <div>
            <div className="header">
                <h1>Your Photos</h1>
                <button onClick={handleAddClick} className="add-button">
                    Add Photo
                </button>
            </div>
            <div className="photo-list">{photoElements}</div>
            {loadMoreVisible && (
                <button onClick={handleSeeMore} className="see-more-button">
                    See More 👉
                </button>
            )}
            {(isUpdateModalOpen || isAddModalOpen) && (
                <div className="modal">
                    <div className="modal-content">
                        <label><strong>Title:</strong></label>
                        <br />
                        <input
                            type="text"
                            value={newPhotoData.title}
                            onChange={e => setNewPhotoData({ ...newPhotoData, title: e.target.value })}
                        />
                        <br />
                        <label><strong>Thumbnail URL:</strong> </label>
                        <br />
                        <input
                            type="text"
                            value={newPhotoData.thumbnailUrl}
                            onChange={e => setNewPhotoData({ ...newPhotoData, thumbnailUrl: e.target.value })}
                        />
                        <div className="button-container">
                            <button onClick={isUpdateModalOpen ? handleSaveUpdate : handleSaveAdd}>Save</button>
                            <button onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Photos