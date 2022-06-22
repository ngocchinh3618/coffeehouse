export const state = () => ({
  cartList: []
})

export const getters = {
  all (state) {
    return state.cartList
  },
  cartLength (state) {
    return state.cartList.reduce((a, b) => a + b.quantity, 0)
  }
}

export const mutations = {
  store (state, data) {
    state.cartList = data
  },
  add (state, content) {
    const index = state.cartList.findIndex(cartItem => cartItem.id === content.id && cartItem.size.drinkSize === content.size.drinkSize)
    if (index !== -1) {
      const object = { ...state.cartList[index] }
      object.quantity += content.quantity
      state.cartList.splice(index, 1)
      state.cartList.push(object)
    } else {
      state.cartList.push(content)
    }
  },
  remove (state, item) {
    const index = state.cartList.findIndex(cartItem => cartItem.id === item.id)
    state.cartList.splice(index, 1)
  },
  delAll (state) {
    state.cartList.splice(0, state.cartList.length)
  }
}

export const actions = {
  storeCart (vuexContext, content) {
    return vuexContext.commit('store', content)
  },
  addCart (vuexContext, content) {
    return vuexContext.commit('add', content)
  },
  deleteCart (vuexContext, content) {
    return vuexContext.commit('remove', content)
  },
  deleteAll (vuexContext) {
    return vuexContext.commit('delAll')
  }
}
