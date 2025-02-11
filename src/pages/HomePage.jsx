import React, { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
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
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


export default function HomePage() {
  const myStyle = {
    backgroundImage: "url('/public/images/pool-overview.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "absolute",
  };

  const collectionStore = collection(database, "rooms");
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collectionStore);
        const roomsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Rooms Data:", roomsArray);
        setRooms(roomsArray);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleBooking = (roomId) => {
    //alert(`Room ${roomId} booked successfully!`);
    navigate("/PaymentPage", { state: { roomId } });
  };

  return (
    <div>
    <h1>Ocean view Palace</h1>
      <div className="top"><NavBar/></div>
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
  color="blue"
  onClick={() => handleBooking(room.id)} 
  disabled={!room.availability} 
>
  Book Now
</Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <h6>Contacts</h6>
        <ul>
          <li>Email: theoceanviewpalace@gmail.com</li>
          <li>Call: 087 043 9576</li>
        </ul>
        <Button color="red" onClick={signOut}>
          Sign Out
        </Button>
      </footer>
    </div>
  );
}







// import React from "react";
// import { useState, useEffect } from 'react';
// import Navbar from "../components/NavBar";
// import {app, database, imageDb} from '../firebaseConfig';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { signOut } from "firebase/auth";
// import {
//     CardMeta,
//     CardHeader,
//     CardDescription,
//     CardContent,
//     Card,
//     Icon,
//     Image,
//   } from 'semantic-ui-react';
//   import {useNavigation, Link} from "react-router-dom";

// export default function HomePage(){
//     const myStyle = {
//         backgroundImage:
//             "url('./images/swimming-pool.jpg')",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//     };

//     const collectionStore = collection(database, 'rooms');

//     const [room, setRoom] = useState({
//       img: "",
//       room:"",
//       description: "",
//       price: "",
//       capacity: "",
//       availability: "",
//   });

//     useEffect(() => {
//       const fetchRooms = () => {
//           getDocs(collectionStore)
//               .then((snapshot) => {
//                   const roomsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                   console.log("Rooms Data:", roomsArray);
//                   setRoom(roomsArray);
//               })
//               .catch((error) => {
//                   console.error('Error fetching rooms:', error);
//               });
//       };
//       fetchRooms();
//   }, []);

//   function Signout(){
//     signOut();
//   }

  
    

//     return(
//         <div>
//             {/* <form className="search-form">
//             <input type="search" id="gsearch" name="gsearch"/>
//             <button>Search</button>
//             </form> */}
//             <div className="top">
//                  </div>
//             <div className="main">
//                 <div className="grid">
//                     <div className="col"><Card>
//                     {Object.values(room).map((value, index) => (
//     <div key={index}>
//           <>
//           <Image src='/' wrapped ui={false} />
//     <CardContent>
//       <CardHeader>{value.room}</CardHeader>
//       <CardMeta>
//         <span className='date'>{value.price}</span>
//       </CardMeta>
//       <CardDescription>
//         {value.description}
//       </CardDescription>
//     </CardContent>
//     <CardContent extra>
//       <a>
//         <Icon name='user' />
//         {value.capacity}
//       </a>
//     </CardContent>
//           </>
//     </div>
// ))}
//   </Card></div>
//                     {/* <div className="col"><img src="hotel-room.jpg"width="150"/></div>
//                     <div className="col"><img src="hotel-room.jpg" width="150"/></div>
//                     <div className="col"><img src="hotel-room.jpg" width="150"/></div> */}
//                     <div className="col">
//                     <a href="http://www.google.com">
//                     <img src="./images/arrow-icon-bg.png" />
//                     </a>
//                     </div>
//                     {/* <button><Link to="PaymentPage">Don't have an account : Sign Up</Link></button> */}
//                 </div>
//             </div>
//             <footer>
//                 <h6>Contacts</h6>
//                 <ul>
//                     <li>Email: theoceanviewpalace@gmail.com</li>
//                     <li>Call: 087 043 9576</li>
//                 </ul>
//                 <button>Sign Out</button>
//             </footer>
//         </div>
//     )
// }