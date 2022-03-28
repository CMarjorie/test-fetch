import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import chargement from "./img/loading.gif";

const url = 'https://api.thecatapi.com/v1/images/search';
const pageNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const [pictures, setPictures] = useState([]);
  // création du NumberPerPage pour pouvoir par la suite permettre à l'utilisateur de choisir par une input type select
  const [numberPerPage, setNumberPerPage] = useState(9);
  //création pagination 
  const [currentPage, setCurrentPage] = useState(0);
  //création chargement
  const [isLoading, setLoadingState] = useState(false);

  //Dépendance du tableau vide pour lancement au démarrage de la page sans autre dépendance
  // useEffect(fetchData, []);
  //Dépendance au Nbre par page ET à la page courante
  useEffect(fetchData, [numberPerPage, currentPage]);
  //Dépendance à la page courante si l'on ne choisissait pas un nombre par page à afficher
  // useEffect(fetchData, [currentPage]);

  return (
    <div className="App">
        <div className="Input">
          <label for="current_page">Choisissez le nombre d'éléments à afficher par page</label>
          <input type="text" name="current_page" onChange={(e) => handleChange(e)}></input>
        </div>
          {isLoading && <img src={chargement} className="Loading-gif" alt="chargement GIF"/>}
        <div class="Pictures">
          {pictures.map((picture, index) => (
            <img className="Picture" key={index} src={picture.url} alt="chat" />
          ))}
        </div>
        <div className="Pagination">
          {pageNumbers.map((number, index) => (
            <button key={index} onClick={() => setCurrentPage(number)}>{number}</button>
          ))}
        </div>
      
    </div>
  );

    function fetchData(){
      //on valide l'affichage du loading
      setLoadingState(true);
      //on instancie un tableau d'images vide pendant le chargement
      setPictures([]);
      axios.get(`${url}?limit=${numberPerPage}&page=${currentPage}`).then(response => {
        //On remplit le tableau d'images avec les datas reçues de l'appel à l'API
        setPictures(response.data);
        //On reset l'état du loading à false pour cacher l'image de loading
        setLoadingState(false);
      });
    }

    function handleChange(e) {
      const input = e.target.value;
      setNumberPerPage(input);
    }
}

export default App;
