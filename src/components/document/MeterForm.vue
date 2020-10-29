<template>
  <a-modal
    :title="title"
    v-model:visible="visible"
    @ok="handleOk"
    :rules="rules"
    width="700px"
  >
    <a-form
      ref="forms"
      :model="formItem"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="电表编号" name="meaternum">
            <a-input
              v-model="formItem.meaternum"
              placeholder="请输入电表编号"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="制造商" name="manufacturer">
            <a-input
              v-model="formItem.manufacturer"
              placeholder="请输入制造商"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="生产日期" name="manufacturedate">
            <a-date-picker
              v-model="formItem.manufacturedate"
              placeholder="请选择生产日期"
              :locale="locale"
            >
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="安装日期" name="installdate">
            <a-date-picker
              v-model="formItem.installdate"
              placeholder="请选择安装日期"
              :locale="locale"
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
          <a-form-item label="额定电流：" name="ratedcurrent">
            <a-input
              v-model="formItem.ratedcurrent"
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
          <a-form-item label="最大电流：" name="maxcurrent">
            <a-input
              v-model="formItem.maxcurrent"
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
          <a-form-item label="频率：" name="frequency">
            <a-input
              v-model="formItem.frequency"
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
          <a-form-item label="电表倍率：" name="k">
            <a-input v-model="formItem.k" placeholder="请输入电表倍率" number />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="改造前示数：" name="olddisplayvalue">
            <a-input
              v-model="formItem.olddisplayvalue"
              placeholder="请输入改造前示数"
              number
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="改造后示数：" name="displayvalue">
            <a-input
              v-model="formItem.displayvalue"
              placeholder="请输入改造后示数"
              number
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="用电地址：" name="address">
            <a-input
              v-model="formItem.address"
              placeholder="请输入用电地址"
              number
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="资产编号：" name="anlh">
            <a-input
              v-model="formItem.anlh"
              placeholder="请输入资产编号"
              number
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { mapState, mapGetters } from 'vuex'

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
  private visible = false
  private title = '新增'

  private rules = {}
  private formItem = {
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
  public show() {
    this.visible = true
    this.formItem.manufacturedate = this.$moment(new Date()).format(
      'YYYY-MM-DD',
    )
    this.formItem.installdate = this.$moment(new Date()).format('YYYY-MM-DD')
  }
  private handleOk() {
    this.visible = false
  }
}
</script>
