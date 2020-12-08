<template>
  <div>
    <div class="opt">
      <a-form :model="form" layout="inline" ref="forms" :locale="locale">
        <a-form-item label="电表编号" name="meaternum">
          <a-input
            v-model:value="form.meaternum"
            placeholder="请输入电表编号"
          />
        </a-form-item>
        <a-form-item label="制造商" name="manufacturer">
          <a-input
            v-model:value="form.manufacturer"
            placeholder="请输入制造商"
          />
        </a-form-item>
        <a-form-item label="电表类型" name="meatertype">
          <a-select
            v-model:value="form.meatertype"
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
        <a-form-item>
          <a-button type="primary" @click="getRecordData">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="reset">重置</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="openModal()">新增</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table
      :columns="columns"
      :data-source="recordData"
      bordered
      :pagination="pagination"
      @change="handleTableChange"
      :scroll="{ y: 600 }"
      :rowKey="columnId"
      :loading="tableLoading"
    >
      <template v-slot:meatertype="{ text }">
        <span>{{ getMeterTypeName(text) }}</span>
      </template>
      <template v-slot:voltype="{ text }">
        <span>{{ getVolTypeName(text) }}</span>
      </template>
      <template #action="{ record  }" class="opt">
        <a-button type="primary" @click="openModal(record)">
          编辑
        </a-button>
        <a-button type="danger" @click="remove(record.id)">
          删除
        </a-button>
      </template>
    </a-table>
  </div>
  <meter-form ref="meter" @submit-form="submit"></meter-form>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { ref, reactive, onBeforeUpdate } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import MeterForm from '@/components/document/MeterForm.vue'

@Options({
  components: { MeterForm },
  computed: {
    ...mapState('dictionary', {
      meterType: (state: any) => state.meterType,
      volType: (state: any) => state.volType,
    }),
    ...mapGetters('dictionary', ['getMeterTypeName', 'getVolTypeName']),
  },
  // provide() {},
  inject: ['locale'],
})
export default class EleMeter extends Vue {
  public $refs!: {
    forms: HTMLFormElement
    meter: HTMLFormElement
  }
  private tableLoading = false
  private columns = [
    {
      title: '电表编号',
      key: 'meaternum',
      width: 220,
      dataIndex: 'meaternum',
      align: 'center',
    },
    {
      title: '资产编号',
      key: 'anlh',
      dataIndex: 'anlh',
      align: 'center',
      width: 150,
    },
    {
      title: '安装日期',
      key: 'installdate',
      dataIndex: 'installdate',
      align: 'center',
      width: 150,
      // slot: {
      //   customRender: 'installdate',
      // },
    },
    {
      title: '生产日期',
      key: 'manufacturedate',
      dataIndex: 'manufacturedate',
      align: 'center',
      width: 150,
      // slot: {
      //   customRender: 'manufacturedate',
      // },
    },
    {
      title: '电表类型',
      key: 'meatertype',
      dataIndex: 'meatertype',
      slots: {
        customRender: 'meatertype',
      },
      align: 'center',
      width: 150,
    },
    {
      title: '电压等级',
      key: 'voltype',
      dataIndex: 'voltype',
      slots: {
        customRender: 'voltype',
      },
      align: 'center',
      width: 120,
    },
    {
      title: '用电地址',
      key: 'address',
      dataIndex: 'address',
      // width: 450,
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      align: 'center',
      slots: { customRender: 'action' },
    },
  ]

  private pagination = {
    current: 1,
    total: 0,
    pageSize: 10,
    showSizeChanger: true,
  }

  private recordData = []

  private urls = {
    query: '/dmsmarket/meaters/queryall',
    add: '/dmsmarket/meaters/add',
    del: '/dmsmarket/meaters/del',
    mod: '/dmsmarket/meaters/mod',
  }
  private form = {
    meaternum: '',
    manufacturer: '',
    meatertype: undefined,
  }

  public mounted() {
    this.getRecordData()
  }
  protected submit({ formItem, isEdit }: any, callback: typeof Function) {
    let url = isEdit ? this.urls.mod : this.urls.add
    this.$axios.post(url, formItem).then((data: any) => {
      if (data && data.resultCode === 200) {
        this.getRecordData()
        this.$Message.success('提交成功')
      } else {
        this.$Message.error(`提交失败，${data.message}`)
      }
      callback(data)
    })
  }
  private columnId(record: any) {
    return record.meaternum
  }

  private getRecordData() {
    this.tableLoading = true
    let formItem = this.form
    this.$axios
      .get(this.urls.query, {
        params: {
          ...formItem,
          page: this.pagination.current,
          rows: this.pagination.pageSize,
        },
      })
      .then((data: any) => {
        if (data && data.resultCode === 200) {
          this.recordData = data.data.rows
          this.pagination.total = data.data.total
        } else {
          this.$Message.error('请求失败')
        }
        // this.$Loading.finish()
        this.tableLoading = false
      })
  }

  private handleTableChange(pagination: any) {
    const page = { ...pagination }
    this.pagination.current = page.current
    this.pagination.pageSize = page.pageSize
    this.getRecordData()
  }

  private openModal(record: any) {
    this.$refs.meter.show(record)
  }
  private remove(id: number) {
    this.$axios
      .get(this.urls.del, {
        params: {
          id,
        },
      })
      .then((data: any) => {
        if (data && data.resultCode === 200) {
          this.getRecordData()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除失败')
        }
      })
  }
  private reset() {
    this.$refs.forms.resetFields()
    this.getRecordData()
  }
}
</script>

<style lang="less" scoped>
.opt {
  height: 60px;
  display: flex;
  // justify-content: flex-end;
}
</style>
