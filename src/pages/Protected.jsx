import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../utils/Auth";

export function Protected({children}){
    const {user} = useContext(Context);

    if(!user){
        return <Navigate to="/LoginPage" replace/>
    } else{
        return children;
    }
}