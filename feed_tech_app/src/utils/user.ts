const isConnected = () => {
  if (localStorage.getItem('user') && localStorage.getItem('token')) return true;
  else return false;
}

const getUser = () => {
  if (isConnected()) {
    const strUser = localStorage.getItem('user')
    if (strUser) return JSON.parse(strUser);
    else return null;
  } else return null;
}

const getToken = () => {
  if (isConnected()) {
    const token = localStorage.getItem('token')
    if (token) return token;
    else return null;
  } else return null;
}

export {isConnected, getUser, getToken}