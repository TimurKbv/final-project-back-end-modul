import axios from "axios";
import { create } from "zustand";

const useUsersStore = create((set) => ({
    users: [],
    currentUser: null,
    settings: {},
    isLoading: false,
    errors: [],
    // addUser: (username) => set(state => (
    //     {
    //         users: [
    //             ...state.users,
    //             {username}
    //         ]
    //     }
    // )),
    fetchUsers: async (token) => {
        try {
            const result = await axios.get('http://localhost:8080/users/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            set({users: result.data})
        } catch (error) {
            
        }
    }
}));

export default useUsersStore;