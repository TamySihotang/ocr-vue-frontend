<template>
<div>
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

      <div id="vue-instance" class="form-group" >
      <select class="form-control" @change="changeBank($event)">
        <option value="" selected disabled>Please Select Bank</option>
        <option v-for="bank in banks" :value="bank.code" :key="bank.code">{{ bank.name }}</option>
      </select>
      <br><br>
      <p><span>Selected bank name: {{selectedBank }}</span></p>

      <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
      </label>

      <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
        Upload
      </button>
    
    </div>
     
    

    

    <div class="alert alert-light" role="alert">{{ message }}</div>

  </div>
</template>

<script type="module">
import UploadService from "../services/UploadFilesService";

export default {
  name: "upload-files",
  data() {
    return {
        selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],

      banks: [
      { code: 'BCA', name: 'PT. Bank Central Asia' },
    ],
    selectedBank: null,
    };
    
    
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, this.selectedBank,event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(response => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then(files => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    },
    changeBank (event) {
      this.selectedBank = event.target.options[event.target.options.selectedIndex].value
    },
    mounted() {
    UploadService.getFiles().then(response => {
      this.fileInfos = response.data;
    });
    
  }
  },
};

</script>

