import './App.css';
import Header from './Header/header';
import CategoryList from './CategoryList/categoryList'
import { useEffect, useState } from 'react';
import FastFoodList from './FastFoodList/fastFoodList';
import Loading from './Loading/loading';
import SearchBar from './SearchBar/searchBar';
import notFound from './assets/images/404.png';
import useAxios from './useAxios';
import axios from 'axios';


function App() {

const[url, setUrl] = useState( '/FastFood/list');
const[fastFoodItems, ,loading] = useAxios({
  url
});

  const filterItems = (categoryId) => {
     setUrl( `/FastFood/list/${categoryId ? "?categoryId=" + categoryId: ""}`);
  };

  const searchItems = async (term) =>{
    setUrl( `/FastFood/search/${term ? '?term=' + term : ""}`);
  };
  
  const renderContent =() => {
    if(loading){
      return <loading theme="dark"/>
    }

    if (fastFoodItems.length === 0) {
      return(
        <>
        <div className='alert alert-warning text-center '>
        برای کلید واژه فوق هیچ ایتمی یافت نشد
        </div>
        <img className='mx-auto mt-5 d-block fade-in-horize' src={notFound}/>
        </>
      )
    }

    return<FastFoodList fastFoodItems={fastFoodItems}/>
  }

  return( 
  <div className='wrapper bg-faded-dark'>
    <Header></Header>
    <CategoryList filterItems={filterItems}>
      <SearchBar searchItems={searchItems}/>
    </CategoryList>
    <div className='container mt-4'>{renderContent()}</div>
  </div>
  );

}

export default App;
