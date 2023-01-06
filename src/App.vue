<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome OCR Danamon App"/> -->
    <upload-files></upload-files>
  </div>
</template>

<script type="module">
// import HelloWorld from './components/HelloWorld.vue'
import UploadFiles from "./components/UploadFiles.vue";

export default {
  name: 'App',
  components: {
    UploadFiles
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
