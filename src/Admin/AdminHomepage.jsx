import React, { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app, database, imageDb } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react';

export default function AdminHomePage() {
  const storage = getStorage();
  const collectionStore = collection(database, 'rooms');

  const [room, setRoom] = useState({
    room: '',
    description: '',
    price: '',
    capacity: '',
    availability: '',
  });

  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchRooms = () => {
      getDocs(collectionStore)
        .then((snapshot) => {
          const roomsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          console.log('Rooms Data:', roomsArray);
          setRoom(roomsArray);
        })
        .catch((error) => {
          console.error('Error fetching rooms:', error);
        });
    };
    fetchRooms();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(room);
    addDoc(collectionStore, {
      room: room.room,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      availability: room.availability, // Missing closing bracket was here
    })
      .then(() => {
        alert('Room added');
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(value);
    setRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleClick(e) {
    let imgRef = ref(imageDb, `files/${uuidv4()}`);
    uploadBytes(imgRef, img)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
            setRoom((prevState) => ({
              ...prevState,
              img: url,
            }));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form>
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </form>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <br />
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="input-file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <br />
          <button type="button" onClick={handleClick}>
            Add hotel img
          </button>
        </div>
        <label htmlFor="inputRoomType">Room Type:</label>
        <br />
        <input
          type="text"
          placeholder="Enter text"
          name="room"
          id="inputRoomType"
          value={room.room}
          onChange={handleInputChange}
        />
        <label htmlFor="inputDescription">Add description:</label>
        <br />
        <input
          type="text"
          placeholder="Enter text"
          name="description"
          id="inputDescription"
          value={room.description}
          onChange={handleInputChange}
        />
        <label htmlFor="inputPrice">Add Price:</label>
        <br />
        <input
          type="number"
          placeholder="Enter price"
          name="price"
          id="inputPrice"
          value={room.price}
          onChange={handleInputChange}
        />
        <label htmlFor="inputCapacity">Capacity:</label>
        <br />
        <input
          type="text"
          placeholder="Enter capacity"
          name="capacity"
          id="inputCapacity"
          value={room.capacity}
          onChange={handleInputChange}
        />
        <label htmlFor="inputAvailability">Availability:</label>
        <br />
        <input
          type="text"
          placeholder="Enter availability"
          name="availability"
          id="inputAvailability"
          value={room.availability}
          onChange={handleInputChange}
        />
        <button type="submit">Add Room</button>
      </form>

      <div className="grid">
        {/* Card layout goes here */}
      </div>
    </div>
  );
}
