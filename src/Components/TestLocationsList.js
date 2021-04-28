import React, { useState } from "react";
import TestLocationForm from "./TestLocationForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faPlus } from "@fortawesome/free-solid-svg-icons";

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState([{locationID: 1, envID: 1, hint: ''}]);

  return (
    <>
      { locationsList.map((location, index) =>{ 
        return <TestLocationForm 
            key={`location-${ index }`} 
            id={ index } 
            lists={ locationsList }
          />
      }) }
      <div className={ "container__btn" }>
          <button onClick={ () => {
              setLocationsList([...locationsList, {locationID: 1, envID: 1, hint: ''}]);
            } }
          >
            <FontAwesomeIcon icon={ faPlus }/>Добавить тестовую локацию...
          </button>
          <button onClick={ () => { console.log(locationsList); } }>
            <FontAwesomeIcon icon={ faGlasses }/>Вывести результат в консоль
          </button>
      </div>
    </>
  );
};

export default TestLocationsList;