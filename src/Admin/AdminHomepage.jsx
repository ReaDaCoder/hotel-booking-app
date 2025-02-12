import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Image,
  Button,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
} from "semantic-ui-react";


const storage = getStorage();
const database = getFirestore();
const collectionStore = collection(database, "rooms");

export default function RoomForm() {
  const [room, setRoom] = useState({
    room: "",
    description: "",
    price: "",
    capacity: "",
    availability: "",
  });

  const [rooms, setRooms] = useState([]);
  const [img, setImg] = useState(null);

  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collectionStore);
        const roomsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsArray);
        console.log("Rooms Data:", roomsArray);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  
  function handleInputChange(e) {
    const { name, value } = e.target;
    setRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  }

  
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let imageUrl = "";

      
      if (img) {
        const imgRef = ref(storage, `rooms/${uuidv4()}`);
        const snapshot = await uploadBytes(imgRef, img);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      
      await addDoc(collectionStore, {
        room: room.room,
        description: room.description,
        price: room.price,
        capacity: room.capacity,
        availability: room.availability,
        img: imageUrl, 
      });

      alert("Room added successfully!");

      
      setRoom({
        room: "",
        description: "",
        price: "",
        capacity: "",
        availability: "",
      });
      setImg(null);

      const snapshot = await getDocs(collectionStore);
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error adding room:", error);
      alert(error.message);
    }
  }

  async function deleteRoom(id) {
    try {
      const roomRef = doc(collectionStore, id); // Reference to the document
      await deleteDoc(roomRef); // Delete the document
  
      alert("Room deleted successfully!");
      fetchRooms(); // Refresh the rooms list
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Unable to delete room");
    }
  }

  return (
    <>
    <div className="admin-heading">
        <img src="/public/images/ocean-view-bg.png" width="150px" className="logo" />
        <h1>The Ocean View Palace</h1>
      </div>
     <form onSubmit={handleSubmit}>
      <input type="text" name="room" placeholder="Room Name" value={room.room} onChange={handleInputChange} required />
      <input type="text" name="description" placeholder="Description" value={room.description} onChange={handleInputChange} required />
      <input type="number" name="price" placeholder="Price" value={room.price} onChange={handleInputChange} required />
      <input type="number" name="capacity" placeholder="Capacity" value={room.capacity} onChange={handleInputChange} required />
      <select name="availability" value={room.availability} onChange={handleInputChange} required>
        <option value="">Select Availability</option>
        <option value="Available">Available</option>
        <option value="Not Available">Not Available</option>
      </select>
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Add Room</button>
    </form>
    <div className="main">
            <div className="grid">
              {rooms.map((room) => (
                <div className="col" key={room.id}>
                  <Card>
                    <Image
                      src={room.img || "./images/default-room.jpg"}
                      wrapped
                      ui={false}
                      alt="Room"
                      width="150"
                    />
                    <CardContent>
                      <CardHeader>{room.room}</CardHeader>
                      <CardMeta>
                        <span className="date">${room.price} per night</span>
                      </CardMeta>
                      <CardDescription>{room.description}</CardDescription>
                    </CardContent>
                    <CardContent extra>
                      <a>
                        <Icon name="user" />
                        Capacity: {room.capacity}
                      </a>
                      <span style={{ marginLeft: "10px" }}>
                        {room.availability ? "Available" : "Not Available"}
                      </span>
                    </CardContent>
                    <Button
                    onClick={() =>deleteRoom(room.id)}
                    >
                      Delete
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>
    </>
    
  );
}



// import React, { useState, useEffect } from 'react';
// import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// import { app, database, imageDb } from '../firebaseConfig';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
// import {
//   CardMeta,
//   CardHeader,
//   CardDescription,
//   CardContent,
//   Card,
//   Icon,
//   Image,
// } from 'semantic-ui-react';

// export default function AdminHomePage() {
//   const storage = getStorage();
//   const collectionStore = collection(database, 'rooms');

//   const [room, setRoom] = useState({
//     room: '',
//     description: '',
//     price: '',
//     capacity: '',
//     availability: '',
//   });

//   const [img, setImg] = useState('');

//   useEffect(() => {
//     const fetchRooms = () => {
//       getDocs(collectionStore)
//         .then((snapshot) => {
//           const roomsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//           console.log('Rooms Data:', roomsArray);
//           setRoom(roomsArray);
//         })
//         .catch((error) => {
//           console.error('Error fetching rooms:', error);
//         });
//     };
//     fetchRooms();
//   }, []);

//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log(room);
//     addDoc(collectionStore, {
//       room: room.room,
//       description: room.description,
//       price: room.price,
//       capacity: room.capacity,
//       availability: room.availability, // Missing closing bracket was here
//     })
//       .then(() => {
//         alert('Room added');
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   }

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     console.log(value);
//     setRoom((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }


//   function handleClick(e) {
//     let imgRef = ref(imageDb, `files/${uuidv4()}`);
//     uploadBytes(imgRef, img)
//       .then((snapshot) => {
//         getDownloadURL(snapshot.ref)
//           .then((url) => {
//             console.log(url);
//             setRoom((prevState) => ({
//               ...prevState,
//               img: url,
//             }));
//           })
//           .catch((err) => console.error(err));
//       })
//       .catch((err) => console.log(err));
//   }

//   return (
//     <div>
//       <form>
//         <input type="text" placeholder="Search..." />
//         <button>Search</button>
//       </form>
//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <br />
//           <input
//             type="file"
//             accept="image/jpeg, image/png, image/jpg"
//             id="input-file"
//             onChange={(e) => setImg(e.target.files[0])}
//           />
//           <br />
//           <button type="button" onClick={handleClick}>
//             Add hotel img
//           </button>
//         </div>
//         <label htmlFor="inputRoomType">Room Type:</label>
//         <br />
//         <input
//           type="text"
//           placeholder="Enter text"
//           name="room"
//           id="inputRoomType"
//           value={room.room}
//           onChange={handleInputChange}
//         />
//         <label htmlFor="inputDescription">Add description:</label>
//         <br />
//         <input
//           type="text"
//           placeholder="Enter text"
//           name="description"
//           id="inputDescription"
//           value={room.description}
//           onChange={handleInputChange}
//         />
//         <label htmlFor="inputPrice">Add Price:</label>
//         <br />
//         <input
//           type="number"
//           placeholder="Enter price"
//           name="price"
//           id="inputPrice"
//           value={room.price}
//           onChange={handleInputChange}
//         />
//         <label htmlFor="inputCapacity">Capacity:</label>
//         <br />
//         <input
//           type="text"
//           placeholder="Enter capacity"
//           name="capacity"
//           id="inputCapacity"
//           value={room.capacity}
//           onChange={handleInputChange}
//         />
//         <label htmlFor="inputAvailability">Availability:</label>
//         <br />
//         <input
//           type="text"
//           placeholder="Enter availability"
//           name="availability"
//           id="inputAvailability"
//           value={room.availability}
//           onChange={handleInputChange}
//         />
//         <button type="submit">Add Room</button>
//       </form>

//       <div className="grid">
//         {/* Card layout goes here */}
//       </div>
//     </div>
//   );
// }
