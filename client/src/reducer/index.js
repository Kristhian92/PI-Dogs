import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    SORT_BY_NAME,
    SORT_BY_WEIGHT,
    GET_DETAIL,
} from "../actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(el => {
                if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
                if (Array.isArray(el.temperaments)) {
                    let temps = el.temperaments.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
                ...state,
                dogs: temperamentFiltered
            }
        case FILTER_BY_ORIGIN:
            const all = state.allDogs;
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(el => el.createdInDb) : all.filter(el => !el.createdInDb);
            return {
                ...state,
                dogs: originFiltered
            }
        case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedName,
            }

        case SORT_BY_WEIGHT:
            const sortedWeight = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    return a.weightMin - b.weightMin;
                }) :
                state.dogs.sort(function (a, b) {
                    return b.weightMax - a.weightMax;
                });
            return {
                ...state,
                dogs: sortedWeight,
            }

        case 'POST_DOG':
            return {
                ...state,
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            }

        default:
            return state;
    }
}

export default rootReducer;