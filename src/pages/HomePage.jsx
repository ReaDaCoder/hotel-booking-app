import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "../components/NavBar";
import {app, database, imageDb} from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react';
  import {useNavigation, Link} from "react-router-dom";

export default function HomePage(){
    const myStyle = {
        backgroundImage:
            "url('./images/swimming-pool.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const collectionStore = collection(database, 'rooms');

    const [room, setRoom] = useState({
      img: "",
      room:"",
      description: "",
      price: "",
      capacity: "",
      availability: "",
  });

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

  
    

    return(
        <div>
            {/* <form className="search-form">
            <input type="search" id="gsearch" name="gsearch"/>
            <button>Search</button>
            </form> */}
            <div className="top">
                 </div>
            <div className="main">
                <div className="grid">
                    <div className="col"><Card>
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
  </Card></div>
                    <div className="col"><img src="hotel-room.jpg"width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col"><img src="hotel-room.jpg" width="150"/></div>
                    <div className="col">
                    <a href="http://www.google.com">
                    <img src="./images/arrow-icon-bg.png" />
                    </a>
                    </div>
                    <button><Link to="PaymentPage">Don't have an account : Sign Up</Link></button>
                </div>
            </div>
            <footer>
                <h6>Contacts</h6>
                <ul>
                    <li>Email: theoceanviewpalace@gmail.com</li>
                    <li>Call: 087 043 9576</li>
                </ul>
            </footer>
        </div>
    )
}