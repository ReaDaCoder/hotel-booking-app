import React from 'react';
import { useState } from 'react';
import { getStorage, ref } from "firebase/storage";
import {app, database} from '../firebaseConfig';
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
    const [addRoom, setAddRoom] = useState('');

    return(
        <div>
            <form>
                <input type="text" placeholder="Search..."/>
                <button>Search</button>
            </form>
             <div className="card">
                                <img src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1" alt="User" width="150px"/>
                                <input type="file" accept="image/JPEG, image/png, image/jpg" id="input-file" />
                                <label htmlFor="input-file" id="update-img">Add hotel room</label>
                            </div>
                           <label for="fname">Add description:</label><br/>
                            <input type="text" placeholder='Enter text'/>
                            <label for="fname">Add Price:</label><br/>
                            <input type="number" placeholder='Enter text'/>
                            <div className="grid">
                    <div className="col"><Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
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
  </Card></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                    <a href="http://www.google.com">
                    <img src="./images/arrow-icon-bg.png" />
                    </a>
                    </div>
                </div>
        </div>
    )
}