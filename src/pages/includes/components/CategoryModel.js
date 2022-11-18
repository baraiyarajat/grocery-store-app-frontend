import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


//Category Icons
import icon1 from '../../../assets/images/category/icon-1.svg'
import icon2 from '../../../assets/images/category/icon-2.svg'
import icon3 from '../../../assets/images/category/icon-3.svg'
import icon4 from '../../../assets/images/category/icon-4.svg'
import icon5 from '../../../assets/images/category/icon-5.svg'
import icon6 from '../../../assets/images/category/icon-6.svg'
import icon7 from '../../../assets/images/category/icon-7.svg'
import icon8 from '../../../assets/images/category/icon-8.svg'
import icon9 from '../../../assets/images/category/icon-9.svg'

function CategoryModel(){

    return (
        <>
            <div id="category_model" className="header-cate-model main-gambo-model modal fade" tabIndex="-1" role="dialog" aria-modal="false">
                <div className="modal-dialog category-area" role="document">
                    <div className="category-area-inner">
                        <div className="modal-header">
                            <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
                                <i className="uil uil-multiply"></i>
                            </button>
                        </div>
                        <div className="category-model-content modal-content"> 
                            <div className="cate-header">
                                <h4>Select Category</h4>
                            </div>
                            <ul className="category-by-cat">
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon1} alt=""/>
                                        </div>
                                        <div className="text"> Fruits and Vegetables </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon2} alt=""/>
                                        </div>
                                        <div className="text"> Grocery & Staples </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon3} alt=""/>
                                        </div>
                                        <div className="text"> Dairy & Eggs </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon4} alt=""/>
                                        </div>
                                        <div className="text"> Beverages </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon5} alt=""/>
                                        </div>
                                        <div className="text"> Snacks </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon6} alt=""/>
                                        </div>
                                        <div className="text"> Home Care </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon7} alt=""/>
                                        </div>
                                        <div className="text"> Noodles & Sauces </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon8} alt=""/>
                                        </div>
                                        <div className="text"> Personal Care </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/some-category" className="single-cat-item">
                                        <div className="icon">
                                            <img src={icon9} alt=""/>
                                        </div>
                                        <div className="text"> Pet Care </div>
                                    </Link>
                                </li>
                            </ul>
                            <Link to="/category/some-category" className="morecate-btn"><i className="uil uil-apps"></i>More Categories</Link>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )

}


export default CategoryModel;