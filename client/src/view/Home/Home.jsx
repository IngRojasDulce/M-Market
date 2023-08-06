import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../redux/slices/productsData";
import Nav from "../../components/Nav/Nav";
import Paginado from "../../components/Paginado/Paginado";
import Ordenamiento from "../../components/Ordenamiento/Ordenamiento";
import Product from "../../components/Product/Product";

import Carousel from "../../components/Carousel/Carousel";

import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css"


export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // PAGINATION VARS
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsInPage] = useState(30);

  const totalCards = products.length;
  const lastIndex = currentPage * cardsInPage;
  const firstIndex = lastIndex - cardsInPage;
  const cardsShowed = products.slice(firstIndex, lastIndex);

  

  const setPagina = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);
 
  const resetPage = () => {
    setCurrentPage(1);
  };
  
  return (
    <div id="Home">
      <div>
        <Nav />

        <Carousel />

        <h1 className={styles.container}> 🛍️ Mini Market 🛍️  </h1>
        <br></br>

        <Paginado
          currentPage={currentPage}
          cardsInPage={cardsInPage}
          totalCards={totalCards}
          setPagina={setPagina}
        
        />

      
        <Ordenamiento  resetPage={resetPage}/>

        <div className="container">
          <div className="row justify-content-center">
            {cardsShowed.map((item) => (
              <div className="col-md-4 mb-3" key={item.id}>
                <Product
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
