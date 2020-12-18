import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules/modules.index'

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
})

export default createStore({
  modules,
  plugins: [vuexLocal.plugin],
})
