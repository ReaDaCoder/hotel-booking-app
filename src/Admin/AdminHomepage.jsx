import React from 'react';
import { useState } from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {app, database, imageDb} from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {v4} from "uuid";
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
        img: "",
        room:"",
        description: "",
        price: "",
        capacity: "",
        availability: "",
    });

    const [img, setImg] =useState('');

    function handleSubmit(event){
      event.preventDefault();
      addDoc(collectionStore, {
        img: room.img,
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
      setRoom(prevState => ({
          ...prevState,
          [name]: value
      }));
    }

    function handleClick(){
      let imgRef = ref(imageDb, 'files/${v4()}')
      uploadBytes(imgRef,img)
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
                            <label for="fname">Room Type:</label><br/>
                            <input type="text" placeholder='Enter text' name="room" value={room.room} onChange={handleInputChange}/>
                           <label for="fname">Add description:</label><br/>
                            <input type="text" placeholder='Enter text'name="description" value={room.description} onChange={handleInputChange}/>
                            <label for="fname">Add Price:</label><br/>
                            <input type="number" placeholder='Enter text'name="price" value={room.price} onChange={handleInputChange}/>
                            <label for="fname">Capacity:</label><br/>
                            <input type="text" placeholder='Enter text' name="capacity" value={room.capacity} onChange={handleInputChange}/>
                            <button type="submit" onClick={handleSubmit}>Add Room</button>
            </form>
                            <div className="grid">
                    {/* <div className="col"><Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' width="150" wrapped ui={false} />
    <CardContent>
      <CardHeader>Matthew</CardHeader>
      <CardMeta>
        <span className='date'>Joined in 2015</span>
      </CardMeta>
      <CardDescription>
        Matthew is a musician living in Nashville.
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </CardContent>
  </Card></div> */}
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