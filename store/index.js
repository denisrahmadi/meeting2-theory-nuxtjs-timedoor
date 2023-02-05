import axios from 'axios'

export const state = () => ({
  // recipes: [
  //     {
  //       id: 1,
  //       recipeImage: "https://i.ibb.co/SBsMYNC/Rendang.jpg",
  //       recipeTitle: "Rendang",
  //       likes: 100,
  //       body: "Rendang Recipe",
  //     },
  //     {
  //       id: 2,
  //       recipeImage: "https://i.ibb.co/MRNhgzW/Tomyam.jpg",
  //       recipeTitle: "Tomyam",
  //       likes: 40,
  //       body: "Tomyam Recipe",
  //     },
  //     {
  //       id: 3,
  //       recipeImage: "https://i.ibb.co/CW4tVvp/Spaghetti-aglioo-o-lio.jpg",
  //       recipeTitle: "Spagethi Aglio Olio",
  //       likes: 200,
  //       body: "Spagethi Aglio Olio Recipe",
  //     },
  //     {
  //       id: 4,
  //       recipeImage: "https://i.ibb.co/z7zRVxV/Spaghetti-Carbonara.jpg",
  //       recipeTitle: "Spagethi Carbonara",
  //       likes: 200,
  //       body: "Spagethi Carbonara Recipe",
  //     },
  //     {
  //       id: 5,
  //       recipeImage: "https://i.ibb.co/Cn1XPNB/Kimchi.jpg",
  //       recipeTitle: "Kimchi",
  //       likes: 10,
  //       body: "Kimchi Recipe",
  //     },
  //   ],
  recipes: [],
});

export const getters = {
  recipeData(state) {
    return state.recipes;
  },
};

export const mutations = {
  addNewRecipe(state, payload) {
    return state.recipes.push(payload);
  },

  lastIdRecipes(state) {
    let recipeLength = state.recipes.length;
    return state.recipes[recipeLength - 1].id;
  },

  setRecipe(state, payload) {
    state.recipes = payload;
  },
};

export const actions = {
  nuxtServerInit({ commit }) {
    return axios
      .get(
        "https://recall-nuxtjs-theory-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      )
      .then((response) => {
        const recipeArray = [];
        for (const key in response.data) {
          recipeArray.push({ ...response.data[key], id: key });
        }
        commit("setRecipe", recipeArray);
      })
      .catch((e) => context.error(e));
  },
};
