<template>
     <block :block="fallingDownBlock" class="falling-block" :top="topStep"/>
</template>

<script>
  import { mapState } from 'vuex'

  import Block from "../block/index";
  export default {
    name: "FallingDownBlockWrapper",
    computed:{
      ...mapState([
        'fallingDownBlock',
        'speed',
        'gameStatus'
      ]),
      incline() {
        return this.$store.getters.countIncline
      },
      controlPoint() {
        const {top, bottom} = document.querySelector('.line').getBoundingClientRect();
        return this.incline >= 0 ? top + ((bottom - top) / 2) * (1 - this.fallingDownBlock.step / (10 / 2))
          : bottom - ((bottom - top) / 2) * (1 - this.fallingDownBlock.step / (10 / 2))
      }
    },
    components: {Block},
    data(){
      return {
        timer: 0,
        topStep: 15
      }
    },
    mounted(){
      window.addEventListener('keydown', this.moveBlocks);

      this.incrementBlockDropboxTop()
    },
    methods: {
      incrementBlockDropboxTop() {
        this.topStep += 15;
      },
      moveBlocks(val) {
        if (val.keyCode === 39) this.rightMove();
        if (val.keyCode === 37) this.leftMove();
      },
      rightMove() {
        if (this.fallingDownBlock.step > 1 && this.gameStatus === 'inProgress') {
          this.$store.dispatch('rightMove')
        }
      },
      leftMove() {
        if (this.fallingDownBlock.step < 5 && this.gameStatus === 'inProgress') {
          this.$store.dispatch('leftMove')
        }
      }
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    watch: {
      gameStatus(value){
        if (value === 'stopped') clearInterval(this.timer);

        else this.topStep += 15;
      },
      topStep: {
        handler() {
          if (this.gameStatus === 'inProgress') {
            this.timer = setTimeout(() => {
              this.topStep += 15;

              const blockCord = document.querySelector('.falling-block').getBoundingClientRect();

              if (blockCord.bottom >= this.controlPoint - 10) {
                clearInterval(this.timer);
                this.$store.dispatch('fallingEnds', this.fallingDownBlock);
                this.topStep = 15;
                return;
              }

            }, this.speed);
          }

        },
        immediate: true
      }

    }
  }
</script>

<style scoped>
    .falling-block{
        position: absolute;
    }
</style>
