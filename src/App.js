import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

const url = 'https://api.thecatapi.com/v1/images/search';
const pageNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const [pictures, setPictures] = useState([]);
  // création du NumberPerPage pour pouvoir par la suite permettre à l'utilisateur de choisir par une input type select
  const [numberPerPage, setNumberPerPage] = useState(9);
  //création pagination 
  const [currentPage, setCurrentPage] = useState(0);

  //Dépendance du tableau vide pour lancement au démarrage de la page sans autre dépendance
  // useEffect(fetchData, []);
  //Dépendance au Nbre par page ET à la page courante
  useEffect(fetchData, [numberPerPage, currentPage]);
  //Dépendance à la page courante si l'on ne choisissait pas un nombre par page à afficher
  // useEffect(fetchData, [currentPage]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div className="Input">
          <label for="current_page">Choisissez le nombre d'éléments à afficher par page</label>
          <input type="text" name="current_page" onChange={(e) => handleChange(e)}></input>
        </div>
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
      axios.get(`${url}?limit=${numberPerPage}&page=${currentPage}`).then(response => {
        setPictures(response.data);
      });
    }

    function handleChange(e) {
      const input = e.target.value;
      setNumberPerPage(input);
    }
}

export default App;
