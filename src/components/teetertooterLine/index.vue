<template>
    <div class="line" :style="teeterTooterStyle" ref="line">
        <block v-for="(rightBlock, index) in rightBlocks" :key="index + 1000" :block="rightBlock" class="line_placed-block"/>
        <block v-for="(leftBlock, index) in leftBlocks" :key="index + 1" :block="leftBlock" class="line_placed-block"/>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Block from "@/components/block/index";
  export default {
    name: "TeeterTooterLine",
    computed:{
      ...mapState([
        'rightBlocks',
        'leftBlocks'
      ]),
      getRightSideIndex() {
        return this.$store.getters.getRightSideIndex
      },
      getLeftSideIndex() {
        return this.$store.getters.getLeftSideIndex
      },
      incline() {
        return this.$store.getters.countIncline
      },
      teeterTooterStyle() {
        return {
          transform: `rotate(${this.incline /1.5}deg)`
        }
      }
    },
    components: {Block}
  }
</script>

<style scoped lang="less">
    .line{
        height:15px;
        width:100%;
        position:relative;
        background-color: rgba(12, 12, 12, 0.82);
        transition: transform 0.6s ease-in-out;
        &_placed-block{
            position:absolute;
            bottom:15px;
        }
    }
</style>
