import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';


function CategoryItem(params){
    const category = params.category
    const imageUrl = `http://127.0.0.1:8000${category.image}`
    return(
            <li>
                <Link to={`/products-by-category/${category.slug}`} className="single-cat-item">
                    {/* <a href={`/products-by-category/${category.slug}`} className="single-cat-item"> */}
                    <div className="icon">
                        <img src={imageUrl} alt="category_image"/>
                    </div>
                    <div className="text"> {category.name} </div>
                </Link>
                {/* </a> */}
            </li>
        )
}


function CategoryModel(){

    const {categories, isCategoriesLoading} = useSelector((store)=>store.categories)

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
                                 {! isCategoriesLoading && 
                                        
                                        categories.map((category) =>{
                                            return <CategoryItem key={category.id} category={category}/>
                                        })
                                        
                                    }
                            </ul>
                            {/* <Link to="/category/some-category" className="morecate-btn"><i className="uil uil-apps"></i>More Categories</Link> */}
                        </div>
                    </div>
                </div>
            </div>



        </>
    )

}


export default CategoryModel;