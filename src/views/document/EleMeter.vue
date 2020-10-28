<template>
  <div>
    <div class="opt">
      <a-form :model="form" layout="inline" ref="forms">
        <a-form-item label="电表编号">
          <a-input
            v-model:value="form.meaternum"
            placeholder="请输入电表编号"
          />
        </a-form-item>
        <a-form-item label="制造商">
          <a-input
            v-model:value="form.manufacturer"
            placeholder="请输入制造商"
          />
        </a-form-item>
        <a-form-item label="电表类型">
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
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { ref, reactive, onBeforeUpdate } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

@Options({
  computed: {
    ...mapState('dictionary', {
      meterType: (state: any) => state.meterType,
      volType: (state: any) => state.volType,
    }),
    ...mapGetters('dictionary', ['getMeterTypeName', 'getVolTypeName']),
  },
  // setup() {
  //   const forms = ref()
  //   console.log('setup -> forms', forms)
  //   return {
  //     forms,
  //   }
  // },
})
export default class EleMeter extends Vue {
  public $refs!: {
    forms: HTMLFormElement
  }
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

  private getRecordData() {
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
          // this.$Message.error('请求失败')
        }
        // this.$Loading.finish()
      })
  }

  private handleTableChange(pagination: any) {
    const page = { ...pagination }
    this.pagination.current = page.current
    this.pagination.pageSize = page.pageSize
    this.getRecordData()
  }

  private openModal(record: any) {
    console.log('EleMeter -> openModal -> record', record)
  }
  private remove(id: number) {
    this.axios
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
    console.log('重置', this.$refs.forms.resetFields)

    this.$refs.forms.resetFields()
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
