import { GetterTree } from 'vuex'
import { State } from './state'

export interface Getters {
  getMeterTypeName(state: State): any
  getCalcplayName(state: State): any
  getVolTypeName(state: State): any
  getCompanyTypeName(state: State): any
  getUserTypeName(state: State): any
  getRefundTypeName(state: State): any
  getRefundStateName(state: State): any
  getPayStateName(state: State): any
  getInvoiceStateName(state: State): any
  getInvoiceTypeName(state: State): any
  getExecUserTypeName(state: State): any
  getPayTypeName(state: State): any
}

export const getters: GetterTree<State, State> & Getters = {
  getMeterTypeName: (state: { meterType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = state.meterType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    }
    return '-'
  },
  getCalcplayName: (stateData: { calcplay: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.calcplay.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getVolTypeName: (stateData: { volType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.volType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getCompanyTypeName: (stateData: { companyType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.companyType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getUserTypeName: (stateData: { userType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.userType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getRefundTypeName: (stateData: { refundType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.refundType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getRefundStateName: (stateData: { refundState: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.refundState.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getPayStateName: (stateData: { payState: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.payState.filter(item => item.id === Number(code))
      return arr.length > 0 ? arr.length > 0 && arr[0].name : '-'
    } else {
      return '-'
    }
  },
  getInvoiceStateName: (stateData: { invoiceState: any[] }) => (
    code: number,
  ) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.invoiceState.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getInvoiceTypeName: (stateData: { invoiceType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.invoiceType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getExecUserTypeName: (stateData: { execUserType: any[] }) => (
    code: number,
  ) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.execUserType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
  getPayTypeName: (stateData: { payType: any[] }) => (code: number) => {
    if (code !== null || code !== undefined) {
      let arr = stateData.payType.filter(item => item.id === Number(code))
      return arr.length > 0 && arr[0].name
    } else {
      return '-'
    }
  },
}
