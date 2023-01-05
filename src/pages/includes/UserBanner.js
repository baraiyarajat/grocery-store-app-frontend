import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../api/axios'
import { getUserData } from "../../store/user/userSlice";

function UserBanner(){

    const {user, user_id} = useSelector((store)=>store.user)    


    const dispatch = useDispatch()

    const handleProfilePictureSelection = async (e) =>{
        
        if(e.target.files.length !==0){
            
            
            const profilePictureData = {'file': e.target.files[0],
                                        'user_id': user_id}


            await Promise.all([axios.post('/accounts/set-profile-picture'  ,profilePictureData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            } )])

            dispatch(getUserData())
            

        }
    }
    
    //  useEffect(()=>{
    //     dispatch(getUserData())
    // },[])

    


    return(
        <>
            <div className="dashboard-group">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="user-dt">
                                <div className="user-img">
                                    <img src={user.profile_picture} alt=""/>
                                    <div className="img-add">
                                        <input type="file" id="profile-picture" onChange={(e)=>handleProfilePictureSelection(e)} />
                                        <label htmlFor="profile-picture"><i className="uil uil-camera-plus"></i></label>
                                    </div>
                                </div>
                                <h4>{user.first_name } {user.last_name}</h4>
                                {/* <p>{user.email}<a href="#"><i className="uil uil-edit"></i></a></p> */}
                                {/* <div className="earn-points"><img src="images/Dollar.svg" alt=""/>Points : <span>20</span></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBanner;