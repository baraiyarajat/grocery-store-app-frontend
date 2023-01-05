import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Link, Navigate, useNavigate} from 'react-router-dom';


function CategoryItem(params){
    const category = params.category
    const navigate = useNavigate();
    const handleModalClick = (e) =>{
        e.preventDefault()
        params.setShowCategoryModal(false)
        navigate(`/products-by-category?name=${category.slug}`)
    }

    return(
            <li>
                <Link  onClick={(e)=>handleModalClick(e)} className="single-cat-item">
                    <div className="icon">
                        <img src={category.image} alt="category_image"/>
                    </div>
                    <div className="text"> {category.name} </div>
                </Link>
                
            </li>
        )
}


function CategoryModel( {showCategoryModal , setShowCategoryModal} ){

    const {categories, isCategoriesLoading} = useSelector((store)=>store.categories)

    const handleCategoryModalClose = (e) =>{
        e.preventDefault();
        setShowCategoryModal(false)
    }

    return (
        <>
            <div id="category_model" className="header-cate-model" tabIndex="-1" role="dialog" aria-modal="false">
                    <div className="category-area-inner">
                        <div className="category-model-content modal-content"> 
                            
                                <div className="cate-header">
                                    <h4>Select Category</h4>
                                    <Button className="btn btn-light" onClick={(e)=>handleCategoryModalClose(e)}>Close</Button>
                                </div>
                            
                            <ul className="category-by-cat">
                                 {! isCategoriesLoading && 
                                        
                                        categories.map((category) =>{
                                            return <CategoryItem key={category.id} category={category} setShowCategoryModal={setShowCategoryModal}/>
                                        })
                                        
                                    }
                            </ul>
                            
                        </div>
                    </div>
            </div>
        </>
    )

}


export default CategoryModel;