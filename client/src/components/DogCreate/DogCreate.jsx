import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "../DogCreate/DogCreate.css";




function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Tu raza debe tener un nombre.";
  } else if (input.name.length > 30) {
    errors.name = "Ese es un nombre demasiado largo. ¡¡Hazlo simple!!";
  } else if (!input.heightMin) {
    errors.heightMin = "Se requiere altura mínima!!";
  } else if (isNaN(parseInt(input.heightMin))) {
    errors.heightMin = "La altura debe ser un número";
  } else if (input.heightMin <= 0) {
    errors.heightMin = "Tu raza no puede ser menos que 0";
  } else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
    errors.heightMin = "La altura mínima debe ser inferior a la altura máxima";
  } else if (!input.heightMax) {
    errors.heightMax = "Se requiere altura máxima!!";
  } else if (isNaN(parseInt(input.heightMax))) {
    errors.heightMax = "La altura debe ser un número";
  } else if (input.heightMax > 150) {
    errors.heightMax = "Creo que 150 cm es suficiente para la altura de un perro, ¿no crees?";
  } else if (!input.weightMin) {
    errors.weightMin = "Se requiere peso mínimo!!";
  } else if (isNaN(parseInt(input.weightMin))) {
    errors.weightMin = "El peso debe ser un número.";
  } else if (input.weightMin <= 0) {
    errors.weightMin = "Tu raza debe pesar más que la nada";
  } else if (!input.weightMax) {
    errors.weightMax = "Se requiere peso máximo!!";
  } else if (isNaN(parseInt(input.weightMax))) {
    errors.weightMax = "El peso debe ser un número.";
  } else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
    errors.weightMax = "El peso máximo debe ser mayor que el peso mínimo";
  } else if (input.weightMax > 200) {
    errors.weightMax =
      "¡¡Estamos creando un perro, no un elefante 🐘!! Mantenga su peso por debajo de 200";
  } else if (!input.life_span) {
    errors.life_span = "¡Se requiere vida";
  } else if (isNaN(parseInt(input.life_span))) {
    errors.life_span = "La vida útil debe ser un número";
  } else if (input.life_span > 50) {
    errors.life_span = "Lamentablemente, los perros no viven tanto 😥";
  } else if (input.life_span <= 0) {
    errors.life_span = "No quieres que tu perro viva???? 😮";
  }else if(!input.image) {
    errors.image = "Se requiere imagen";
  } else if (input.image.length !== 0 &&
    !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)) {
     errors.image = "invalid URL";
    }
    return errors;
  
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperaments = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // Esta función hace lo siguiente:
    // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
    // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
    // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    
  }

  function handleSelect(e) {
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
      
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(errors);
    if (
      !Object.getOwnPropertyNames(errors).length &&
      input.name &&
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.life_span &&
      input.image &&
      input.temperaments.length
    ) {
      dispatch(postDog(input));
      alert("Doggie created 👏");
      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
      history.push("/home");
    } else {
      alert("Doggie no se puede crear con estos datos 🤷‍♂️");
    }
  }

  function handleDeleteTemperament(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== el),
    });
  }

  return (
    <div className="divCreate">
      <Link to="/home">
        <button className="buttonHome">
          Home 🏡
        </button>
      </Link>
      <h1 className="title">🐕 Crea tu propia raza de perro 🐶</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            <strong>Name: </strong>
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className="error">
              <strong>{errors.name}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Minimum height: </strong>
          </label>
          <input
            type="text"
            value={input.heightMin}
            name="heightMin"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> cm</strong>
          </label>
          {errors.heightMin && (
            <p className="error">
              <strong>{errors.heightMin}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Maximum height: </strong>
          </label>
          <input
            type="text"
            value={input.heightMax}
            name="heightMax"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> cm</strong>
          </label>
          {errors.heightMax && (
            <p className="error">
              <strong>{errors.heightMax}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Minimum weight: </strong>
          </label>
          <input
            type="text"
            value={input.weightMin}
            name="weightMin"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> kg</strong>
          </label>
          {errors.weightMin && (
            <p className="error">
              <strong>{errors.weightMin}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Maximum weight: </strong>
          </label>
          <input
            type="text"
            value={input.weightMax}
            name="weightMax"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> kg</strong>
          </label>
          {errors.weightMax && (
            <p className="error">
              <strong>{errors.weightMax}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Expected life span: </strong>
          </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> years</strong>
          </label>
          {errors.life_span && (
            <p className="error">
              <strong>{errors.life_span}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Image: </strong>
          </label>
          {errors.image && (
            <p className="error"><strong>{errors.image}</strong></p>
          )}
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="Sin_filtro" hidden>
              Temperaments...
            </option>
            {allTemperaments
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((temp) => {
                return (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                );
              })}
          </select>

          {input.temperaments.map((el) => {
            return (
              <ul className="allTemps" key={el}>
                <li>
                  <p className="temp">
                    <strong>{el}</strong>
                  </p>
                  <button
                    onClick={() => handleDeleteTemperament(el)}
                    className="x"
                  >
                    X
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
        <button type="submit" className="boop">
          <strong>
            Boop 🦴
          </strong>
        </button>
      </form>
    </div>
  );
}
