<script lang="ts">
import { NDataTable } from 'naive-ui'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { fetchHistory } from '@/api/history'
import type { IHistory } from '@/interface/history'

const columns = [
  {
    title: 'IP',
    key: 'ip',
    resizable: true,
  },
  {
    title: '时间',
    key: 'time',
    resizable: true,
  },
  {
    title: '问题',
    key: 'question',
    resizable: true,
  },
  {
    title: '回答',
    key: 'answer',
    resizable: true,
  },
]

async function query(pageNo: number, pageSize = 10) {
  const res = await fetchHistory({ condition: {}, pageNo, pageSize })
  return {
    pageCount: res.data.total / pageSize,
    itemCount: res.data.total,
    data: res.data.list.map(item => ({ ...item, time: new Date(item.time).toLocaleString() })),
  }
}

export default defineComponent({
  components: { NDataTable },
  setup() {
    const dataRef = ref<IHistory[]>([])
    const loadingRef = ref(true)
    const columnsRef = ref(columns)
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      itemCount: 0,
      pageSize: 10,
      prefix({ itemCount = 0 }) {
        return `Total is ${itemCount}.`
      },
    })

    onMounted(() => {
      query(
        paginationReactive.page,
        paginationReactive.pageSize,
      ).then((data) => {
        dataRef.value = data.data
        paginationReactive.pageCount = data.pageCount
        paginationReactive.itemCount = data.itemCount
        loadingRef.value = false
      })
    })

    return {
      data: dataRef,
      columns: columnsRef,
      pagination: paginationReactive,
      loading: loadingRef,
      handlePageChange(currentPage: number) {
        if (!loadingRef.value) {
          loadingRef.value = true
          query(
            currentPage,
            paginationReactive.pageSize,
          ).then((data) => {
            dataRef.value = data.data
            paginationReactive.page = currentPage
            paginationReactive.pageCount = data.pageCount
            paginationReactive.itemCount = data.itemCount
            loadingRef.value = false
          })
        }
      },
    }
  },
})
</script>

<template>
  <NDataTable
    ref="table"
    remote
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    striped
    @update:page="handlePageChange"
  />
</template>
