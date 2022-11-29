import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {getAddresses, deleteAddress} from '../../store/address/addressSlice'


const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function AddressItem({address}){

    const getAddressIcon = (address_type) =>{
        if(address_type==='home'){
            return <i className="uil uil-home-alt"/>
        }else if (address_type==='office'){
            return <i className="uil uil-building"/>
        }else{
            return <i className="uil uil-map"/>
        }
    }

    const dispatch = useDispatch()

    const handleDeleteAddress = async  (addressId) =>{
        
        await Promise.all([
        dispatch(deleteAddress(addressId)),
        ])

        return dispatch(getAddresses())
    }

    return(
        <>
            <div className="address-item">
                <div className="address-icon1">
                    {getAddressIcon(address.address_type)}
                </div>
                <div className="address-dt-all">
                    <h4>{capitalizeFirst(address.address_type)}</h4>
                    <p>{address.address_line_1}, {address.address_line_2}, {address.city.name}, {address.pincode} </p>
                    <ul className="action-btns">
                        {/* <li><a href="#" className="action-btn"><i className="uil uil-edit"></i></a></li> */}
                        <li><button  className="action-btn"><i className="uil uil-edit"></i></button></li>
                        <li><button onClick={()=>handleDeleteAddress(address.id)} className="action-btn"><i className="uil uil-trash-alt"></i></button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}


function Address(){

    const dispatch = useDispatch()
    const {addresses, isLoading} = useSelector((store)=>store.address)


    useEffect(()=>{
        dispatch(getAddresses())
    },[])


    return (
        
        <>
            <Navbar/>
                <div className="wrapper">
                    <div className="gambo-Breadcrumb">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-group">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="user-dt">
                                        <div className="user-img">
                                            <img src="images/avatar/img-5.jpg" alt=""/>
                                            <div className="img-add">													
                                                <input type="file" id="file"/>
                                                <label htmlFor="file"><i className="uil uil-camera-plus"></i></label>
                                            </div>
                                        </div>
                                        <h4>Johe Doe</h4>
                                        <p>+91999999999<a href="#"><i className="uil uil-edit"></i></a></p>
                                        <div className="earn-points"><img src="images/Dollar.svg" alt=""/>Points : <span>20</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                    <div className="">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4">
                                    <div className="left-side-tabs">
                                        <div className="dashboard-left-links">
                                            <Link to="/dashboard" className="user-item "><i className="uil uil-apps"></i>Overview</Link>
                                            <Link to="/orders" className="user-item "><i className="uil uil-box"></i>My Orders</Link>
                                            <Link to="/rewards" className="user-item"><i className="uil uil-gift"></i>My Rewards</Link>
                                            <Link to="/wallet" className="user-item "><i className="uil uil-wallet"></i>My Wallet</Link>
                                            <Link to="/wishlist" className="user-item "><i className="uil uil-heart"></i>Shopping Wishlist</Link>
                                            <Link to="/address" className="user-item active"><i className="uil uil-location-point"></i>My Address</Link>
                                            <Link to="/logout" className="user-item"><i className="uil uil-exit"></i>Logout</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                    <div className="dashboard-right">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-title-tab">
                                                    <h4><i className="uil uil-location-point"></i>My Address</h4>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="pdpt-title">
                                                        <h4>My Address</h4>
                                                    </div>
                                                    <div className="address-body">
                                                        {/* <a href="#" className="add-address hover-btn" data-toggle="modal" data-target="#address_model">Add New Address</a>       */}
                                                        <Link to='/address/add-new-address' className="add-address hover-btn"> Add New Address</Link>
                                                        
                                                        {addresses.map((address)=> <AddressItem key={address.id} address={address}/>)}
                                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>	
                        </div>	
                    </div>	
                </div>




            <Footer/>
        </>
    )

}


export default Address;