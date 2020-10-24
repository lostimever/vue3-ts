import { MutationTree } from 'vuex'
import { MutationTypes } from './mutations-types'
import { State } from './state'

const VOL_TYPE = 100 // 电压类型
const METER_TYPE = 101 // 电表类型
const COMPANY_TYPE = 102 // 电压类型
const USER_TYPE = 200 // 用户类型
const PAY_STATE = 500 // 缴费状态
const INVOICE_STATE = 501 // 发票状态
const INVOICE_TYPE = 600 // 发票类型
const REFUND_TYPE = 502 // 退费类型
const REFUND_STATE = 503 // 退费状态
const CALCPLAY = 900 // 执行电价方式
const PAY_TYPE = 901 // 缴费类型
const EXEC_USER_TYPE = 1001 // 执行用户类型

export interface LoadData {
  [key: string]: any
  [index: number]: any
}

export interface Mutations<S = State, L = LoadData> {
  [MutationTypes.SET_DICTIONARY](state: S, data: L): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_DICTIONARY](state, data) {
    for (const key of Object.keys(data)) {
      const element = data[key]
      switch (Number(key)) {
        case VOL_TYPE:
          state.volType = element
          break
        case METER_TYPE:
          state.meterType = element
          break
        case COMPANY_TYPE:
          state.companyType = element
          break
        case USER_TYPE:
          state.userType = element
          break
        case PAY_STATE:
          state.payState = element
          break
        case INVOICE_STATE:
          state.invoiceState = element
          break
        case INVOICE_TYPE:
          state.invoiceType = element
          break
        case REFUND_TYPE:
          state.refundType = element
          break
        case REFUND_STATE:
          state.refundState = element
          break
        case CALCPLAY:
          state.calcplay = element
          break
        case PAY_TYPE:
          state.payType = element
          break
        case EXEC_USER_TYPE:
          state.execUserType = element
          break
        default:
          break
      }
    }
  },
}
