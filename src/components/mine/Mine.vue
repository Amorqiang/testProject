<template id="">
  <div class="mine clearfix">
  </div>

</template>
<script type="text/javascript">
  import {userInfo} from '../../assets/js/const.js';

  export default {
    components: {},
    created() {
      this.initData();
    },
    methods: {
      initData: function () {
        let data = {'header': {'channel': 1, 'language': 'cn'}};
        this.POST(userInfo, data, function (response) {
          console.log('返回', response.data);
        });
      }
    }
  };
</script>
<style media="screen" lang="less">
  .mine {
    width: 1100px;
    margin: 0 auto;
  }
</style>
