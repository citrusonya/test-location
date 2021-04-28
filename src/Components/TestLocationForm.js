import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { storeContext } from "./../store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVial, faTrashAlt, faServer, faMapMarkerAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faEnvira } from "@fortawesome/free-brands-svg-icons";

const TestLocationForm = observer(function TestLocationForm(props) {
  const store = useContext(storeContext);
  const [locationID, setLocationID] = useState(1);
  const [envID, setEnvID] = useState(1);

  if (!store.isLoaded) {
    return <div className="container__form">Данные не загружены</div>;
  }

  const handleDelete = (e) => {
    e.target.closest(".container__form").remove();
    delete props.lists[props.id];
  }

  const handleLocation = (key, value) => {
    props.lists[props.id][key] = value
  }

  const handleLocationID = (e) => {
    const data = parseInt(e.target.options[e.target.selectedIndex].getAttribute("data-local-id"))
    setLocationID(data)
    if (data !== 1)  {
        setEnvID(2)
        handleLocation('envID', 2)
    }

    handleLocation('locationID', data)
  }

  const handleEnvID = (e) => {
    const data = parseInt(e.target.options[e.target.selectedIndex].getAttribute("data-env-id"))
    setEnvID(data)
    handleLocation('envID', data)
  }

  const currentServer = () => {
    let arrServer = [];
    store.servers.forEach((server) => {
      if (server['locationID'] === locationID && server['envID'] === envID)
        arrServer.push(server)
      })
    return arrServer
  }

  const handleComment = (e) => {
    handleLocation('hint', e.target.value)
  }

  return (
    <div className="container__form">
      <div className="header">
        <h1>
          <FontAwesomeIcon icon={ faVial }/>
          Тестовая локация { props.id + 1 }
        </h1>
        <div className="btn_del" onClick={ handleDelete }>
          <FontAwesomeIcon icon={ faTrashAlt }/>
        </div>
      </div>

      <div className="main">
        <div>
          <label htmlFor="location" className="label">Локация</label>
          <div className="select">
            <FontAwesomeIcon icon={ faMapMarkerAlt }/>
            <select name="location" onChange={ handleLocationID }>
              { store.locations.map((value, index) => {
                return  <option 
                              value={ value["name"] }
                              key={ index }
                              data-local-id={ value["locationID"] }>
                          { value["name"] }
                        </option>
              })}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="env">Среда</label>
          <div className="select">
            <FontAwesomeIcon icon={ faEnvira }/>
            <select name="env" onChange={ handleEnvID }>
              { store.envs.map((value, index) => {
                return (
                  locationID === 1 ?  <option value={ value["name"] } key={ index } data-env-id={ value["envID"] }>
                                        { value["name"] }
                                      </option>
                  : (locationID === 2 || locationID === 3 || locationID === 4) && index === store.envs.length - 1 
                  ? <option value={ value["name"] } key={ index } data-env-id={ value["envID"] }>
                      { value["name"] }
                    </option> 
                  : null
                )
              })}
            </select>
          </div>
        </div>
        <div>
          <span>Серверы</span>
          <div className="server">
            <FontAwesomeIcon icon={ faServer }/>
            { currentServer().map((value, index) => {
              return (
                currentServer().length !== index + 1 ?
                  <p key={ index }>
                  { value["name"] },&nbsp;
                  </p> :
                  <p key={ index }>
                      { value["name"] }
                  </p>
              )
            })}
          </div>
        </div>
        <div>
          <span>Подсказка</span>
          <div className="select select_comment">
            <FontAwesomeIcon icon={ faQuestion }/>
            <input
              placeholder={ 'Комментарий по локации' }
              onChange={ handleComment }
            />
          </div>
        </div>
      </div>
    </div>
  )
});

export default TestLocationForm;