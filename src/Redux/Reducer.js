import { GET_DOCUMENT_ID, UPDATE_DOCUMENT_SUCCESS } from "./ActionsTypes";

let inicialState = {
  documentidData: {} // Cambiado a objeto
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case GET_DOCUMENT_ID:
      return {
        ...state,
        documentidData: action.payload // Almacena el documento encontrado
      };
      case UPDATE_DOCUMENT_SUCCESS:
        return {
          ...state,
          documentidData: action.payload // Almacena el documento encontrado
        };

    default:
      return state;
  }
};

export default rootReducer;




