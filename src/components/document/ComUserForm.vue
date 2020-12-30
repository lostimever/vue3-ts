<template>
  <a-modal
    :title="formTitle"
    v-model:visible="visible"
    @ok="handleOk"
    width="780px"
    :maskClosable="false"
    centered
  >
    <a-form
      ref="modalForm"
      :model="formItem"
      :rules="rulesRef"
      :label-col="{ span: 9 }"
      :wrapper-col="{ span: 15 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="电表编号" name="meaternum">
            <a-input
              v-model:value="formItem.meaternum"
              placeholder="请输入电表编号"
              @blur="enterMeaterNum"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用电户号" name="elecnum">
            <a-input
              v-model:value="formItem.elecnum"
              placeholder="请输入用电户号"
              disabled
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="用户名称" name="username">
            <a-input
              v-model:value="formItem.username"
              placeholder="请输入用户名称"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="联系人手机" name="phone">
            <a-input-number
              v-model:value="formItem.phone"
              placeholder="请输入联系人手机"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="用电地址：" name="address">
            <a-input
              v-model:value="formItem.address"
              placeholder="请输入用电地址"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="电价执行方式" name="calcplay">
            <a-select
              v-model:value="formItem.calcplay"
              placeholder="请选择电价执行方式"
              style="width: 174px"
            >
              <a-select-option
                v-for="item in calcplay"
                :value="item.id"
                :key="item.name"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="账户余额" name="balance">
            <a-input
              v-model:value="formItem.balance"
              placeholder="请输入账户余额"
            >
              <template v-slot:suffix>
                <span>元</span>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="待缴金额" name="bill">
            <a-input v-model:value="formItem.bill" placeholder="请输入待缴金额">
              <template v-slot:suffix>
                <span>元</span>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="红包余额" name="redpacket">
            <a-input
              v-model:value="formItem.redpacket"
              placeholder="请输入红包余额"
            >
              <template v-slot:suffix>
                <span>元</span>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="积分" name="integral">
            <a-input v-model:value="formItem.integral" placeholder="请输入积分">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="缴费类型" name="paytype">
            <a-select
              v-model:value="formItem.paytype"
              placeholder="请选择缴费类型"
              style="width: 174px"
            >
              <a-select-option
                v-for="item in payType"
                :value="item.id"
                :key="item.name"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="查询密码" name="querypwd">
            <a-input-password
              v-model:value="formItem.querypwd"
              placeholder="请输入查询密码"
            >
            </a-input-password>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template v-slot:footer>
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="handleOk">
        确定
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { reactive, ref } from 'vue'
import { Options, Vue, setup } from 'vue-class-component'
import { mapState, mapGetters } from 'vuex'
import { useForm } from '@ant-design-vue/use'

interface FormItems {
  [key: string]: any
  [index: number]: any
}
function formData() {
  const meaternum = ref('')
  const _id = ref(null)
  const elecnum = ref('')
  const username = ref('')
  const phone = ref('')
  const calcplay = ref(1)
  const balance = ref('0')
  const bill = ref(0)
  const redpacket = ref(0)
  const integral = ref(0)
  const address = ref('')
  const paytype = ref(1)
  const querypwd = ref('')
  return {
    _id,
    elecnum,
    meaternum,
    username,
    phone,
    calcplay,
    balance,
    bill,
    redpacket,
    integral,
    address,
    paytype,
    querypwd,
  }
}

function formRules() {
  const validateMeaterNum = (rule: any, value: any) => {
    let res = /^\d{11,}$/
    if (!res.test(value)) {
      return Promise.reject('请输入10位以上的数字！')
    }
    return Promise.resolve()
  }

  const priceValidate = (rule: any, value: any) => {
    let ret = /^-?\d+(\.\d{1,2})?$/
    if (!ret.test(value)) {
      return Promise.reject('请输入正确的金额格式！')
    }
    return Promise.resolve()
  }

  const validatePhone = (rule: any, value: any) => {
    let res = /^1[3456789]\d{9}$/
    if (!res.test(value)) {
      return Promise.reject('请输入正确手机号码格式！')
    }
    return Promise.resolve()
  }
  const meaternum = [
    {
      required: true,
      message: '电表编号不能为空',
      trigger: 'blur',
    },
    {
      validator: validateMeaterNum,
      trigger: 'blur',
    },
  ]
  const elecnum = [
    {
      required: true,
      message: '用电户号不能为空',
      trigger: 'blur',
    },
  ]
  const username = [
    {
      required: true,
      message: '用户名称不能为空',
      trigger: 'blur',
    },
  ]
  const companytype = [
    {
      required: true,
      type: 'number',
      message: '企业类型不能为空',
      trigger: 'change',
    },
  ]
  const contactp = [
    {
      required: true,
      message: '联系人不能为空',
      trigger: 'blur',
    },
  ]
  const phone = [
    {
      required: true,
      message: '联系人手机不能为空',
      type: 'number',
      trigger: 'blur',
    },
    {
      validator: validatePhone,
      trigger: 'blur',
    },
  ]

  const address = [
    {
      required: true,
      message: '用电地址不能为空',
      trigger: 'blur',
    },
  ]
  const balance = [
    {
      required: true,
      message: '账户余额不能为空',
      trigger: 'blur',
    },
    // { validator: priceValidate, trigger: 'blur' },
  ]
  // const   bill= [{ validator: priceValidate, trigger: 'blur' }]
  // const    redpacket= [{ validator: priceValidate, trigger: 'blur' }]
  const calcplay = [
    {
      required: true,
      type: 'number',
      message: '电价执行方式不能为空',
      trigger: 'change',
    },
  ]
  return {
    meaternum,
    elecnum,
    username,
    companytype,
    contactp,
    phone,
    address,
    balance,
    calcplay,
  }
}

@Options({
  emits: ['submit-form'],
  computed: {
    ...mapState('dictionary', {
      calcplay: (state: any) => state.calcplay,
      payType: (state: any) => state.payType,
    }),
  },
  inject: ['locale'],
})
export default class MeterForm extends Vue {
  public formItem: FormItems = setup(() => formData())
  public rulesRef = setup(() => formRules())
  public $refs!: {
    // eslint-disable-next-line prettier/prettier
    modalForm: HTMLFormElement,
  }
  public dateFormat = 'YYYY-MM-DD'
  private visible = false
  private isEdit = false
  private formTitle = '新增'

  // private formItem: FormItems = {
  //   id: '',
  //   elecnum: '',
  //   meaternum: '',
  //   companyname: '',
  //   contactp: '',
  //   phone: '',
  //   ecat: 2,
  //   elecaddr: '',
  //   voltype: 1,
  //   transforcap: '0',
  //   legalp: '',
  //   usercomregaddr: '',
  //   calcplay: 1,
  //   balance: '0',
  //   bill: 0,
  //   redpacket: 0,
  //   integral: 0,
  //   companytype: 1,
  //   indcomregauthor: '',
  //   userabbreviation: '',
  //   contactemail: '',
  //   contacttel: '',
  //   contractaddr: '',
  //   paytype: 1,
  //   querypwd: '',
  // }
  // private formItemCopy: FormItems = {}
  // private rules = {
  //   meaternum: [
  //     {
  //       required: true,
  //       message: '电表编号不能为空',
  //       trigger: 'blur',
  //     },
  //   ],
  // }
  public show(data: any) {
    this.visible = true
    this.isEdit = data ? true : false
    this.formTitle = this.isEdit ? '编辑' : '新增'
    this.formItem._id = null

    if (data) {
      this.$nextTick(() => {
        for (const key of Object.keys(this.formItem)) {
          this.formItem[key] = data[key]
        }
      })
    }
  }

  private handleOk() {
    this.$refs.modalForm
      .validate()
      .then(() => {
        // console.log('values', this.formItem)
        let formItem = Object.assign({}, this.formItem)
        this.$emit(
          'submit-form',
          {
            formItem,
            isEdit: this.isEdit,
          },
          (data: any) => {
            if (data.resultCode === 200) {
              this.visible = false
              this.$refs.modalForm.resetFields()
            }
            // this.$Loading.finish()
          },
        )
      })
      .catch((error: any) => {
        console.log('error', error)
      })
  }
  private handleCancel() {
    this.$refs.modalForm.resetFields()
    // console.log('cancel', this.formItem)
    this.visible = false
  }
  private enterMeaterNum() {
    this.$refs.modalForm.validateFields(['meaternum']).then(() => {
      let len = this.formItem.meaternum.length
      this.formItem.elecnum = this.formItem.meaternum.substring(len - 10, len)
    })
  }
}
</script>
