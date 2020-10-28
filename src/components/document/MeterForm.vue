<template>
  <a-modal title="Title" v-model:visible="visible" @ok="handleOk">
    <p>{{ ModalText }}</p>
  </a-modal>
</template>
