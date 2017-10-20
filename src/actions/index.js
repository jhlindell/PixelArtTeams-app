

export function changeShowState() {
  return {
    type: 'CHANGE_PALETTE_SHOW_STATE'
  };
}

export function changeShowMenuState() {
  return {
    type: 'CHANGE_MENU_SHOW_STATE'
  };
}

export function updateColor(nextColor) {
  return {
    type: 'UPDATE_COLOR',
    payload: {nextColor},
  };
}

export function selectProject(id){
  return {
    type: 'SELECT_PROJECT',
    payload: { id }
  };
}

export function pixelClick(x, y, color) {
  return {
    type: 'PIXEL_CLICK',
    payload: { x, y, color }
  };
}

export function updateGrid(grid){
  return {
    type: 'UPDATE_GRID',
    payload: grid
  };
}

export function fetchProjects(projects){
  return {
    type: 'FETCH_PROJECTS',
    payload: projects
  };
}

export function mouseDownAction(){
  return {
    type: 'MOUSE_DOWN',
    payload: true
  };
}

export function mouseUpAction(){
  return {
    type: 'MOUSE_UP',
    payload: false
  };
}

export function getGallery(art){
  return {
    type: 'GET_GALLERY',
    payload: art
  };
}
