import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {PencilIcon, TrashIcon} from '@primer/octicons-react'

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {getAddresses, deleteAddress} from '../../store/address/addressSlice'
import { useState } from 'react';



const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function AddressItem({address, showModal,  setShow, setAddressObject}){

    const {warehouses, isLoading} = useSelector((store)=>store.warehouse)
    const city = warehouses.filter((warehouse)=>{
        return warehouse.id === address.city
    })[0].name

    

    const getAddressIcon = (address_type) =>{
        if(address_type==='home' || address_type==='Home'){
            return <i className="uil uil-home-alt"/>
        }else if (address_type==='office' || address_type==='Office'){
            return <i className="uil uil-building"/>
        }else{
            return <i className="uil uil-map"/>
        }
    }

    const dispatch = useDispatch()


    const handleEditAddress = () =>{
        
        const existingAddressObject = {address_type:'Home',
                                    address_line_1:address.address_line_1,
                                    address_line_2:address.address_line_2,
                                    pincode:address.pincode,
                                    city:city,
                                    address_id:address.id}
        setAddressObject(existingAddressObject)
        
        setShow(true)
        


    }

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
                    <p>{address.address_line_1}, {address.address_line_2}, {city}, {address.pincode} </p>
                    <ul className="action-btns">
                        
                        <li><button className="btn" onClick={()=>handleEditAddress()} ><PencilIcon size={18} /></button></li>
                        <li><button className="btn" onClick={()=>handleDeleteAddress(address.id)} ><TrashIcon size={18} /></button></li>
                        
                    </ul>
                </div>
            </div>
        </>
    )
}


function Address(){

    const dispatch = useDispatch()
    const {addresses, isLoading} = useSelector((store)=>store.address)
    const {user, isAuthenticated} = useSelector((store)=>store.user)
    const warehouseObject = useSelector((store)=>store.warehouse)

    const [showModal, setShow] = useState(false);

    


    const initialAddressObject = {address_type:'Home',
                                    address_line_1:'',
                                    address_line_2:'',
                                    pincode:'',
                                    city:'',
                                    address_id:null}

    const [addressObject, setAddressObject] = useState(initialAddressObject)
                              

    const handleClose = () => {
        
        setAddressObject(initialAddressObject)
        return setShow(false)
    
    };
    const handleShow = () => setShow(true);

    const handleAddressFormChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setAddressObject({...addressObject, [name]:value})
    }

    const navigate = useNavigate();

    const handleAddressFormSubmit = (e) =>{
        e.preventDefault();
        
        if (addressObject.city === ''){
            addressObject.city= warehouseObject.warehouses[0].name
        }

        const addressFormData = {"user_id":user.id,
                                "address_type":addressObject.address_type,
                                "address_line_1":addressObject.address_line_1,
                                "address_line_2":addressObject.address_line_2,
                                "pincode":addressObject.pincode,
                                "city":addressObject.city,
                                "address_id":addressObject.address_id}


        if(addressFormData["address_id"] != null){            
            axios.patch('http://127.0.0.1:8000/api/v0/addresses/edit-address', addressFormData).then((response) => {
            dispatch(getAddresses())
            setAddressObject(initialAddressObject)
            setShow(false)
            
            navigate('/address')
        })
        .catch(error => {
            setAddressObject(initialAddressObject)
            setShow(false)

        });
        }else{
            
            axios.post('http://127.0.0.1:8000/api/v0/addresses/add-address', addressFormData)
        .then((response) => {
            dispatch(getAddresses())

            setAddressObject(initialAddressObject)
            setShow(false)

            navigate('/address')
        })
        .catch(error => {
            setAddressObject(initialAddressObject)
            setShow(false)

        });

        }
        
        
    }

    useEffect(()=>{
        dispatch(getAddresses())
    },[dispatch])

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
                                                        <Button onClick={handleShow} className=" add-address btn btn-secondary hover-btn" >Add New Address</Button>
                                                        <Modal show={showModal} onHide={handleClose}>
                                                            <div id="address_model" className="header-cate-model" tabIndex="-1" role="dialog" aria-modal="false">
                                                                <div className="category-area-inner">
                                                                    <div className="category-model-content modal-content"> 
                                                                        <div className="cate-header">
                                                                            <h4>Add New Address</h4>
                                                                        </div>
                                                                        <div className="add-address-form">
                                                                            <div className="checout-address-step">
                                                                                <div className="row">
                                                                                    <div className="col-lg-12">												
                                                                                        <form onSubmit={handleAddressFormSubmit}>   
                                                                                            
                                                                                            <div className="address-fieldset">
                                                                                                <div className="row">
                                                                                                    <div className="col-lg-12 col-md-12">
                                                                                                        <div className="form-group">
                                                                                                            <label className="control-label">Flat / House / Office No.*</label>
                                                                                                            <input id="address_line_1" name="address_line_1" type="text" placeholder="Address" value={addressObject.address_line_1} onChange={handleAddressFormChange} className="form-control input-md" required={true}/>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-lg-12 col-md-12">
                                                                                                        <div className="form-group">
                                                                                                            <label className="control-label">Street / Society / Office Name*</label>
                                                                                                            <input id="address_line_2" name="address_line_2" type="text" placeholder="Street Address" value={addressObject.address_line_2} onChange={handleAddressFormChange} className="form-control input-md" required={true}/>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="col-lg-6 col-md-12">
                                                                                                        <div className="form-group">
                                                                                                            <label htmlFor="address_type" className="control-label">Address Type*</label>
                                                                                                            <select id="address_type" name="address_type" className="form-control input-md" value={addressObject.address_type} onChange={handleAddressFormChange}>
                                                                                                                <option value="Home">Home</option>
                                                                                                                <option value="Office">Office</option>
                                                                                                                <option value="Other">Other</option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-lg-6 col-md-12">
                                                                                                        <div className="form-group">
                                                                                                            <label className="control-label">Pincode*</label>
                                                                                                            <input id="pincode" name="pincode" type="text" placeholder="Pincode" value={addressObject.pincode} onChange={handleAddressFormChange} className="form-control input-md" required={true}/>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-lg-6 col-md-12">
                                                                                                        <div className="form-group">
                                                                                                            <label htmlFor="city" className="control-label">City*</label>
                                                                                                            <select id="city" name="city" className="form-control input-md" value={addressObject.city} required={true} onChange={handleAddressFormChange}>
                                                                                                                {!warehouseObject.isLoading && 
                                                                                                                    warehouseObject.warehouses.map((warehouse)=>{
                                                                                                                        return <option key={warehouse.id} value={warehouse.name}>{warehouse.name}</option>
                                                                                                                    })
                                                                                                                }
                                                                                                            </select>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-lg-12 col-md-12">
                                                                                                        <div className="form-group mb-0">
                                                                                                            <div className="address-btns">
                                                                                                                <button className="save-btn14 hover-btn">Save</button>
                                                                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                                                                <button onClick={handleClose} type ="button" className="save-btn14 hover-btn">Cancel</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </form>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Modal>

                                                        {!isLoading && addresses.map((address)=> <AddressItem key={address.id} address={address} showModal={showModal}  setShow={setShow} addressObject={addressObject} setAddressObject={setAddressObject}  />)}
                                                                    
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