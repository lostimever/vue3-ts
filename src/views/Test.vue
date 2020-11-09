<template>
  <a-modal
    :title="title"
    v-model:visible="visible"
    @ok="handleOk"
    :rules="rules"
    width="700px"
    :maskClosable="false"
  >
    <a-form
      ref="modalForm"
      :model="formItem"
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
  <a-button key="submit" @click="show">
    查看
  </a-button>
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
  public $refs!: {
    modalForm: HTMLFormElement
  }
  private visible = false
  private title = '新增'

  private rules = {}

  private formItem: FormItems = {
    id: '',
    meaternum: '',
    manufacturer: '',
  }
  public show(data: any) {
    this.visible = true

    this.formItem.meaternum = '1'
    this.formItem.manufacturedate = this.$moment(new Date()).format(
      'YYYY-MM-DD',
    )
    this.formItem.installdate = this.$moment(new Date()).format('YYYY-MM-DD')
  }

  private handleOk() {
    this.visible = false
    this.$refs.modalForm.resetFields()
  }
  private handleCancel() {
    this.$refs.modalForm.resetFields()
    console.log('cancel', this.formItem)
    // this.visible = false
  }
}
</script>
