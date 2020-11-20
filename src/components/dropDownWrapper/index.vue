<template>
    <div class="dropdown-block">
        <block v-for="(leftBlock, index) in startFallingLeftBlocks" :key="index" :block="leftBlock" class="start-falling-left-block"/>
        <falling-down-block-wrapper v-if="fallingDownBlock.inAction"/>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Block from "../block/index";
  import FallingDownBlockWrapper from "../fallingDownBlockWrapper/index";
  export default {
    name: "DropDownWrapper",
    computed:{
      ...mapState([
        'startFallingLeftBlocks',
        'fallingDownBlock'
      ]),
    },
    components: {FallingDownBlockWrapper, Block}
  }
</script>

<style scoped lang="less">
    .dropdown-block{
        height:100%;
        margin: 0 10%;
        position:relative;
        .start-falling-left-block {
            position:absolute;
        }
    }
</style>
