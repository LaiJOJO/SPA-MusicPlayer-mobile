import { createStore } from 'vuex'
import musicListStore from './musicListStore/musicListStore'
import currentMusicStore from './currentMusicStore/currentMusicStore'
import searchMusicStore from './searchMusicStore/searchMusicStore'

export default createStore({
  modules:{
    musicListStore,
    currentMusicStore,
    searchMusicStore
  }
})


/* const state = {
}
const actions = {

}
const mutations = {
  
}
const getters = {

}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}*/
