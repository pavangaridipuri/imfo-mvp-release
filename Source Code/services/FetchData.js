
const URI = 'http://localhost:3000';

export default {
    
    async fetchUsers() {
        return fetch('https://api.myjson.com/bins/10tza2')
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.users;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      
    
}