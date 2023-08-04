import React from "react";
import Nav from "../../components/Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allProducts } from "../../redux/slices/productsData";
import Paginado from "../../components/Paginado/Paginado";
import ProductContainer from "../../components/ProductContainer/ProductContainer";

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // PAGINATION VARS
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsInPage, setCardsInPage] = useState(20);

  const totalCards = products.length;
  const lastIndex = currentPage * cardsInPage;
  const firstIndex = lastIndex - cardsInPage;
  const cardsShowed = products.slice(firstIndex, lastIndex); // Dividimos el array original con los productos a mostrar

  const setPagina = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Nav />
        <Paginado
          currentPage={currentPage}
          cardsInPage={cardsInPage}
          totalCards={totalCards}
          setPagina={setPagina}
        />
        <h1>Mini Market</h1>
        <ProductContainer products={cardsShowed} />
      </div>
    </div>
  );
}
