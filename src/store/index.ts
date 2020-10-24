import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import modules from './modules/modules.index'

export default createStore({
  // state: {},
  // mutations: {},
  // actions: {},
  modules,
})

// export type Store = Omit<
//   VuexStore<State>,
//   'getters' | 'commit' | 'dispatch'
// > & {
//   commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//     key: K,
//     payload: P,
//     options?: CommitOptions,
//   ): ReturnType<Mutations[K]>,
// } & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload: Parameters<Actions[K]>[1],
//     options?: DispatchOptions,
//   ): ReturnType<Actions[K]>,
// } & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>
//   },
// }
