import { create } from "zustand";
import axios from "axios";


const useAuthStore = create( set => ({
    // Speicherort fuer user objekt
    user: null,

    isAuthenticated: function() {
      return this.user !== null
    },    
    
    validateToken: async () => {
      const token = localStorage.getItem('token');
      try {
          let resp = await axios.get('http://localhost:8080/users/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }  
          });
          
          set({user: resp.data});
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
      }
    },

    // Methode zum Speichern des users und des tokens
    authenticate: (user) => {
      // Speichere token im localStorage
      localStorage.setItem('token', user.token);
  
      // Speichere user Objekt im store
      set({ user: user }); // setze neuen user
    },
  
    // Methode zum Holen des gespeicherten tokens
    getToken: () => localStorage.getItem('token'),
  
    // Methode zum Ausloggen (loeschen des users und des tokens)
    logout: () => {
      // entferne token aus localStorage
      localStorage.removeItem('token');
  
      // entferne user Objekt aus user Store
      set({user: null});
    }
}));
  
export default useAuthStore;