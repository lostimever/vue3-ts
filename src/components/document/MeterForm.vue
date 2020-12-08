<template>
  <a-modal
    :title="title"
    v-model:visible="visible"
    @ok="handleOk"
    width="700px"
    :maskClosable="false"
  >
    <a-form
      ref="modalForm"
      :model="formItem"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="电表编号" name="meaternum">
            <a-input
              v-model:value="formItem.meaternum"
              placeholder="请输入电表编号"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="制造商" name="manufacturer">
            <a-input
              v-model:value="formItem.manufacturer"
              placeholder="请输入制造商"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="生产日期" name="manufacturedate">
            <a-date-picker
              v-model:value="formItem.manufacturedate"
              placeholder="请选择生产日期"
              :locale="locale"
              :format="dateFormat"
            >
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="安装日期" name="installdate">
            <a-date-picker
              v-model:value="formItem.installdate"
              placeholder="请选择安装日期"
              :locale="locale"
              :format="dateFormat"
            >
            </a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="电表类型" name="meatertype">
            <a-select
              v-model:value="formItem.meatertype"
              placeholder="请选择电表类型"
              style="width: 174px"
            >
              <a-select-option
                v-for="item in meterType"
                :value="item.id"
                :key="item.name"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电压等级" name="voltype">
            <a-select
              v-model:value="formItem.voltype"
              placeholder="请选择电压等级"
              style="width: 174px"
            >
              <a-select-option
                v-for="item in volType"
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
          <a-form-item label="额定电流" name="ratedcurrent">
            <a-input
              v-model:value="formItem.ratedcurrent"
              placeholder="请输入额定电流"
              number
            >
              <template v-slot:suffix>
                <span>A</span>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="最大电流" name="maxcurrent">
            <a-input
              v-model:value="formItem.maxcurrent"
              placeholder="请输入最大电流"
              number
            >
              <template v-slot:suffix>
                <span>A</span>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="频率" name="frequency">
            <a-input
              v-model:value="formItem.frequency"
              placeholder="请输入频率"
              number
            >
              <template v-slot:suffix>
                <span>Hz</span>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="电表倍率" name="k">
            <a-input
              v-model:value="formItem.k"
              placeholder="请输入电表倍率"
              number
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="改造前示数" name="olddisplayvalue">
            <a-input
              v-model:value="formItem.olddisplayvalue"
              placeholder="请输入改造前示数"
              number
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="改造后示数" name="displayvalue">
            <a-input
              v-model:value="formItem.displayvalue"
              placeholder="请输入改造后示数"
              number
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="用电地址" name="address">
            <a-input
              v-model:value="formItem.address"
              placeholder="请输入用电地址"
              number
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="资产编号" name="anlh">
            <a-input
              v-model:value="formItem.anlh"
              placeholder="请输入资产编号"
              number
            />
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

interface FormItems {
  [key: string]: any
  [index: number]: any
}

@Options({
  computed: {
    ...mapState('dictionary', {
      meterType: (state: any) => state.meterType,
      volType: (state: any) => state.volType,
    }),
  },
  inject: ['locale'],
})
export default class MeterForm extends Vue {
  // public formItem = setup(() => formData())
  public $refs!: {
    modalForm: HTMLFormElement
  }
  public dateFormat = 'YYYY-MM-DD'
  private visible = false
  private isEdit = false
  private title = '新增'

  private formItem: FormItems = {
    id: '',
    meaternum: '',
    manufacturer: '',
    manufacturedate: new Date(),
    installdate: new Date(),
    meatertype: 1,
    voltype: 1,
    frequency: 0,
    ratedcurrent: 0,
    maxcurrent: 0,
    k: 0,
    olddisplayvalue: 0,
    displayvalue: 0,
    address: '',
    anlh: '',
  }
  private formItemCopy: FormItems = {}
  private rules = {
    meaternum: [
      {
        required: true,
        message: '电表编号不能为空',
        trigger: 'blur',
      },
    ],
    manufacturedate: [
      {
        // eslint-disable-next-line space-before-function-paren
        validator: async (rule: any, value: any) => {
          let installdate = this.formItem.installdate.valueOf()
          // console.log('校验测试 ', installdate)
          if (installdate < value.valueOf()) {
            return Promise.reject('生产日期不可在安装日期之后')
          }

          return Promise.resolve()
        },
        trigger: 'change',
      },
    ],
    installdate: [
      {
        // eslint-disable-next-line space-before-function-paren
        validator: async (rule: any, value: any) => {
          let manufacturedate =
            this.formItem.manufacturedate &&
            this.formItem.manufacturedate.valueOf()
          if (manufacturedate && manufacturedate > value.valueOf()) {
            return Promise.reject('安装日期不可在生产日期之前')
          }
          return Promise.resolve()
        },
        trigger: 'change',
      },
    ],
    address: [
      {
        required: true,
        message: '用电地址不能为空',
        trigger: 'blur',
      },
    ],
  }
  public show(data: any) {
    this.formItemCopy = Object.assign(this.formItem, {})
    // console.log('MeterForm -> show -> data', data)
    this.visible = true
    this.isEdit = false
    if (data) {
      for (const key of Object.keys(this.formItem)) {
        this.formItem[key] = data[key]
      }
      this.title = '编辑'
      this.isEdit = true
    } else {
      this.formItem = Object.assign(this.formItemCopy, {})
      this.formItem.manufacturedate = this.$moment(new Date())
      this.formItem.installdate = this.$moment(new Date())
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
}
</script>
