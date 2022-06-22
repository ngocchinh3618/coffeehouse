export const state = () => ({
  loginState: false,
  location: {}
})

export const getters = {
  logState (state) {
    return state.loginState
  },
  userLocation (state) {
    return state.location
  }
}

export const mutations = {
  login (state, bool) {
    state.loginState = bool
  },
  logout (state, bool) {
    state.loginState = bool
  },
  location (state, location) {
    state.location = location
  }
}

export const actions = {
  login (vuexContext, content) {
    return vuexContext.commit('login', content)
  },
  logout (vuexContext, content) {
    return vuexContext.commit('logout', content)
  },
  setLocation (vuexContext, content) {
    return vuexContext.commit('location', content)
  }
}
