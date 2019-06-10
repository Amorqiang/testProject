<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="show"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="600px"
      class="download-dialog-main">
      <span class="clearfix">
        <div>
          <el-button v-for="(item, index) in urlData" type="primary" :key="index" class="download-dialog-button"
                     @click="downloadAsset(item)">{{$t('common.file')}}{{index + 1}}
          </el-button>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">{{$t('MyAssets.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['show', 'url'],
    data () {
      return {
        urlData: []
      };
    },
    mounted () {
      this.urlData = this.url.split(';');
      console.log(this.url);
    },
    methods: {
      closeDialog() {
        this.$emit('closeDownloadDialog');
      },
      downloadAsset (url) {
        window.open(url);
      }
    }
  };
</script>

<style lang="less">
  .download-dialog-main {
    .el-dialog__body {
      padding: 0 20px;
    }
    span.clearfix {
      .download-dialog-button {
        width: 80px;
        margin: 10px 60px 0 0;
      }
      >div {
        width: 432px;
        margin: 0 auto;
      }
    }
  }
</style>
