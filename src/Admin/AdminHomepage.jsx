import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";


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

  const [img, setImg] = useState(null); 

  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collectionStore);
        const roomsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Rooms Data:", roomsArray);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  // Handle input change for room details
  function handleInputChange(e) {
    const { name, value } = e.target;
    setRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Handle image selection
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  }

  // Upload image & save room data
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let imageUrl = "";

      // If an image is selected, upload it
      if (img) {
        const imgRef = ref(storage, `rooms/${uuidv4()}`);
        const snapshot = await uploadBytes(imgRef, img);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Add room details including the image URL to Firestore
      await addDoc(collectionStore, {
        room: room.room,
        description: room.description,
        price: room.price,
        capacity: room.capacity,
        availability: room.availability,
        img: imageUrl, // Store the image URL in Firestore
      });

      alert("Room added successfully!");

      // Reset form
      setRoom({
        room: "",
        description: "",
        price: "",
        capacity: "",
        availability: "",
      });
      setImg(null);
    } catch (error) {
      console.error("Error adding room:", error);
      alert(error.message);
    }
  }

  return (
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
