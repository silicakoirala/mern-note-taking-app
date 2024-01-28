import { create } from 'zustand';
import axios from 'axios';

const authStore = create((set) => ({
  loggedIn: null,

  loginData: {
    email: "",
    password: "",
  },

  updateForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginData: {
          ...state.loginData,
          [name]: value,
        },
      };
    });
  },

  login: async (e) => {
    const { loginData } = authStore.getState();

    const res = await axios.post("/login", loginData, {
      withCredentials: true,
    });
    set({
      loggedIn: true,
      loginData: {
        email: "",
        password: "",
      },
    });
  },

  checkAuth: async (e) => {
    try {
      await axios.get("/check-auth", {
        withCredentials: true
      });
      set({ loggedIn: true });
    }
    catch (err) {
      set({ loggedIn: false });
    }
  },

  signup: async () => {
    const { signupForm } = authStore.getState();
    const res = axios.post('/signup', signupForm, {
      withCredentials: true,
    })

    set({
      loginData: {
        email: "",
        password: "",
      },
    });
  },

  logout: async () => {
    await axios.get('/logout', { withCredentials: true });
    set({ loggedIn: false });
  }
}));

export default authStore;