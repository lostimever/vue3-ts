<template>
  <div>
    <div class="opt">
      <a-form :model="form" layout="inline" ref="forms" :locale="locale">
        <a-form-item label="用电户号" name="elecnum">
          <a-input v-model:value="form.elecnum" placeholder="请输入用电户号" />
        </a-form-item>
        <a-form-item label="用户名称" name="username">
          <a-input v-model:value="form.username" placeholder="请输入用户名称" />
        </a-form-item>
        <a-form-item label="用电地址" name="address">
          <a-input v-model:value="form.address" placeholder="请输入用电地址" />
        </a-form-item>
        <a-form-item label="电价执行方式" name="calcplay">
          <a-select
            v-model:value="form.calcplay"
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
      <template v-slot:ecat="{ text }">
        <span>{{ getExecUserTypeName(text) }}</span>
      </template>
      <template v-slot:calcplay="{ text }">
        <span>{{ getCalcplayName(text) }}</span>
      </template>
      <template #action="{ record  }" class="opt">
        <a-button type="primary" @click="openModal(record)">
          编辑
        </a-button>
        <a-button type="danger" @click="remove(record)">
          删除
        </a-button>
      </template>
    </a-table>
  </div>
  <com-user-form ref="user" @submit-form="submit"></com-user-form>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { ref, reactive, onBeforeUpdate } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ComUserForm from '@/components/document/ComUserForm.vue'

@Options({
  components: { ComUserForm },
  computed: {
    ...mapState('dictionary', {
      volType: (state: any) => state.volType,
      calcplay: (state: any) => state.calcplay,
      companyType: (state: any) => state.companyType,
      execUserType: (state: any) => state.execUserType,
      payType: (state: any) => state.payType,
    }),
    ...mapGetters('dictionary', [
      'getVolTypeName',
      'getCalcplayName',
      'getExecUserTypeName',
      'getCompanyTypeName',
    ]),
  },

  inject: ['locale'],
})
export default class EleMeter extends Vue {
  public $refs!: {
    forms: HTMLFormElement
    // eslint-disable-next-line prettier/prettier
    user: HTMLFormElement
  }
  private tableLoading = false
  private columns = [
    {
      title: '用电户号',
      key: 'elecnum',
      dataIndex: 'elecnum',
      width: 115,
      fixed: 'left',
    },
    {
      title: '用户名称',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: '联系人手机',
      key: 'phone',
      dataIndex: 'phone',
      width: 125,
    },
    {
      title: '电价执行方式',
      key: 'calcplay',
      dataIndex: 'calcplay',
      slots: {
        customRender: 'calcplay',
      },
      width: 125,
    },
    {
      title: '账户余额',
      key: 'balance',
      dataIndex: 'balance',
      width: 100,
      align: 'center',
    },
    {
      title: '用电地址',
      key: 'address',
      dataIndex: 'address',
      width: 600,
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      align: 'center',
      fixed: 'right',
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
    query: '/api/commonuser/query',
    add: '/api/commonuser/add',
    del: '/api/commonuser/remove',
    mod: '/api/commonuser/update',
  }
  private form = {
    username: '',
    elecnum: '',
    address: '',
    calcplay: undefined,
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
        this.$Message.error(`提交失败，${data.msg}`)
      }
      callback(data)
    })
  }
  private columnId(record: any) {
    return record.meaternum
  }

  private getRecordData() {
    this.tableLoading = true
    let formItem = Object.assign({}, this.form)
    this.$axios
      .get(this.urls.query, {
        params: {
          ...formItem,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize,
        },
      })
      .then((data: any) => {
        if (data && data.resultCode === 200) {
          this.recordData = data.data
          this.pagination.total = data.totalCount
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
    this.$refs.user.show(record)
  }
  private remove({ _id }: any) {
    this.$axios
      .get(this.urls.del, {
        params: {
          _id,
        },
      })
      .then((data: any) => {
        if (data && data.resultCode === 200) {
          this.getRecordData()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error(`删除失败，${data.msg}`)
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
