import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../components/App';
import '../css/Posts.css';
import '../css/Albums.css';



function Albums() {
  const [albums, setAlbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState('');
  const [searchBy, setSearchBy] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [notFoundShow, setNotFoundShow] = useState(false);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [newAlbumData, setnewAlbumData] = useState({ title: '' });
  const params = useParams();
  const { user } = useContext(userContext);

  useEffect(() => {
    fetch(`http://localhost:3000/albums?userId=${params.id}`)
      .then((res) => res.json())
      .then((albums) => {
        setAlbums(albums);
        setOriginalAlbums(albums);
      })
      .catch((error) => console.error('Error fetching todos:', error));
  }, [params.id]);

  const handleSearchAlbums = (category, searchTerm) => {

    const term = searchTerm.toLowerCase();

    if (term !== '') {
      let filteredAlbums = originalAlbums.filter((album) => {
        switch (category) {
          case 'id':
            return album.id.toString().startsWith(term);
          case 'title':
            return album.title.toLowerCase().startsWith(term);
          default:
            return true;
        }
      });
      if (filteredAlbums == '') {
        setNotFoundShow(true);
      }
      else {
        setNotFoundShow(false);
      }
      setAlbums(filteredAlbums);
    } else {
      setAlbums(originalAlbums);
    }

  }

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchTerm('');
    handleSearchAlbums(e.target.value, '');
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearchAlbums(searchBy, e.target.value);
  };

  const handleAddAlbumClick = () => {
    setShowAddAlbumForm(true);
  };

  const handleAlbumDataChange = (e) => {
    const { name, value } = e.target;
    setnewAlbumData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveAlbum = () => {
    fetch('http://localhost:3000/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        id: '',
        title: newAlbumData.title
      }),
    })
      .then(response => response.json())
      .then(newAlbum => {
        setAlbums([...albums, newAlbum]);
        setShowAddAlbumForm(false);
        setnewAlbumData('');
      })
      .catch(error => console.error('Error adding album:', error));
  };

  const handleCancelAddAlbum = () => {
    setShowAddAlbumForm(false);
    setnewAlbumData('');
  };


  const albumsElements = albums.map(album => (
    <div key={album.id} className="post-tile">
      <Link to={`/home/users/${user.id}/albums/${album.id}`}>
        <div className="album-info">
          <h3>{album.id}</h3>
          <p>{album.title}</p>
        </div>
      </Link>
    </div>
  ))

  return (
    <div>
      <h1>Your Albums</h1>
      <label>
        Search by:
        <select value={searchBy} onChange={handleSearchByChange} className='select-category'>
          <option value="id">Id</option>
          <option value="title">Title</option>
        </select>
      </label>
      <input
        type="text"
        placeholder={`Enter search term for ${searchBy}`}
        value={searchTerm}
        onChange={handleSearchTermChange}
        className='input-search'
      />
      <br />

      <button className='add-button' onClick={handleAddAlbumClick}>Add Album</button>
      {showAddAlbumForm && (
        <div className="add-post-form">
          <input
            type="text"
            placeholder="Enter Album Title"
            name="title"
            value={newAlbumData.title}
            onChange={handleAlbumDataChange}
          />
          <button onClick={handleSaveAlbum}>Save</button>
          <button onClick={handleCancelAddAlbum}>Cancel</button>
        </div>
      )}

      <div className="post-list">
        {albumsElements}
      </div>
      {notFoundShow && (<h2>
        {`${searchBy} ${searchTerm} does not exist`}
      </h2>)}
    </div>
  )
}

export default Albums