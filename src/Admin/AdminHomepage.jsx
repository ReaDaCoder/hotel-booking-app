import React from 'react';
import { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {app, database, imageDb} from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {v4 as uuidv4} from "uuid";
 import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'
 

export default function AdminHomePage(){
    const storage = getStorage();
    const collectionStore = collection(database, 'rooms');
    const [room, setRoom] = useState({
        // img: "",
        room:"",
        description: "",
        price: "",
        capacity: "",
        availability: "",
    });

    const [img, setImg] =useState('');

    useEffect(() => {
      const fetchRooms = () => {
          getDocs(collectionStore)
              .then((snapshot) => {
                  const roomsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  console.log("Rooms Data:", roomsArray);
                  setRoom(roomsArray);
              })
              .catch((error) => {
                  console.error('Error fetching rooms:', error);
              });
      };
      fetchRooms();
  }, []);

    // useEffect(() =>{
    //   const roomRef = ref(database, 'users');
    //   get(roomRef).then((snapshot) => {
    //     if(snapshot.exists()){
    //       const roomsArray = Object.entries(snapshot.val()).map(([id, data]) =>({
    //         id, ...data,
    //       }));
    //       setRoom(roomsArray);
    //     }
    //   }).catch((error) =>{
    //     console.error(error);
    //   })
    // }, []);

    function handleSubmit(event){
      event.preventDefault();
      console.log(room);
      addDoc(collectionStore, {
        // img: room.img,
        room: room.room,
        description:room.description, 
        price: room.price,
        capacity: room.capacity,
        availability: room.availability

      })
      .then(()=>{
        alert("Room added")
      })
      .catch((err)=>{
        alert(err.message);
      })
    }

    

    function handleInputChange(e) {
      const { name, value } = e.target;
      console.log(value)
      setRoom(prevState => ({
          ...prevState,
          [name]: value
      }));
    }

    function handleClick(){
      let imgRef = ref(imageDb, `files/${uuidv4()}`)
    uploadBytes(imgRef,img).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url)
        setRoom(prevState => ({
          ...prevState,
          img: url
      }));
      }).catch((err)=>console.error(err))
    }).catch((err)=>console.log(err))
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Search..."/>
                <button>Search</button>
            </form>
            <form  onSubmit={handleSubmit}>
            <div className="card">
                                <br/>
                                <input type="file" accept="image/JPEG, image/png, image/jpg" id="input-file" onChange={(e)=>setImg(e.target.files[0])}/>
                                <br/>
                                <button onClick={handleClick}>Add hotel img</button>
                            </div>
                            <input type="file" onChange={(e)=>handleUpload(e)}/>
                            <label htmlFor="fname">Room Type:</label><br/>
                            <input type="text" placeholder='Enter text' name="room" value={room.room} onChange={handleInputChange}/>
                           <label htmlFor="fname">Add description:</label><br/>
                            <input type="text" placeholder='Enter text'name="description" value={room.description} onChange={handleInputChange}/>
                            <label htmlFor="fname">Add Price:</label><br/>
                            <input type="number" placeholder='Enter text'name="price" value={room.price} onChange={handleInputChange}/>
                            <label htmlFor="fname">Capacity:</label><br/>
                            <input type="text" placeholder='Enter text' name="capacity" value={room.capacity} onChange={handleInputChange}/>
                            <label htmlFor="fname">Availability:</label><br/>
                            <input type="text" placeholder='Enter text' name="availability" value={room.availability} onChange={handleInputChange}/>
                            <button type="submit" onClick={handleSubmit}>Add Room</button>
            </form>
                            <div className="grid">
                    <div className="col">
                      <Card>
                      {Object.values(room).map((value, index) => (
    <div key={index}>
          <>
          <Image src='/' wrapped ui={false} />
    <CardContent>
      <CardHeader>{value.room}</CardHeader>
      <CardMeta>
        <span className='date'>{value.price}</span>
      </CardMeta>
      <CardDescription>
        {value.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <a>
        <Icon name='user' />
        {value.capacity}
      </a>
    </CardContent>
          </>
    </div>
))}

  </Card>
  </div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                    <a href="http://www.google.com">
                    <img src="./images/arrow-icon-bg.png" width="200" />
                    </a>
                    </div>
                </div>
        </div>
    )
}