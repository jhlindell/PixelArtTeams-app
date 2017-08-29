import { combineReducers } from 'redux';

function gridReducer(state, action) {
  if (state === undefined) {
    let grid = [];
    for (var i = 0; i < 20; i++) {
      let row = [];
      for (var j = 0; j < 20; j++) {
        row.push('#FFF');
      }
      grid.push(row);
    }
    return grid;
  }

  switch (action.type) {
    case 'PIXEL_CLICK':
    const newGrid = state.map((row, y) => row.map((pixel, x) => {
      if (x === action.payload.x && y === action.payload.y) {
        return action.payload.color;
      }
      return pixel;
    }));
    return newGrid;

    case 'UPDATE_GRID':
    // console.log(action.payload);
    return action.payload;

    default:
    return state;
  }

}

function activeColor(state = '#000', action) {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return action.payload.nextColor;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  activeColor,
  gridReducer,
});

export default rootReducer;
