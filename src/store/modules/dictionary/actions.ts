import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations, LoadData } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutations-types'

const allDicUrl = '/dmsmarket/publics/dictionaryAll'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    LoadData: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.GET_DICTIONARY](
    { commit }: AugmentedActionContext,
    data: LoadData,
  ): Promise<number>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_DICTIONARY]({ commit }) {
    return new Promise((resolve, reject) => {
      window.$axios.get(allDicUrl).then((data: any) => {
        if (data && data.resultCode === 200) {
          commit(MutationTypes.SET_DICTIONARY, data.data)
          resolve()
        } else {
          reject(`获取字典失败，${data.message}`)
        }
      })
    })
  },
}
