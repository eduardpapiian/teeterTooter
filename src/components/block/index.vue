<template>
    <div :style="blockStyle"
         :class="blockClass">
        <span class="weight-num">{{ block.weight }}</span>
    </div>
</template>

<script>
  export default {
    name: "Block",
    props: {
      block: {
        type: Object,
        required: true
      },
      top: {
        type: Number
      }
    },
    computed:{
      blockStyle() {
        const styles = {};

        // create block shape
        switch (this.block.shape) {
          case 'circle':
            styles.top = `${this.top}px`;
            styles.height = `${this.block.size}px`;
            styles.width = `${this.block.size}px`;
            styles.backgroundColor = this.block.color;
            break;
          case 'triangle':
            styles.top = `${this.top}px`;
            styles.borderWidth =  `0 ${this.block.size}px ${this.block.size}px ${this.block.size}px`;
            styles.lineHeight = `${this.block.size}px`;
            styles.borderColor = `transparent transparent ${this.block.color} transparent`;
            break;
          case 'rectangle':
            styles.top = `${this.top}px`;
            styles.height = `${this.block.size / 1.5}px`;
            styles.width = `${this.block.size * 1.5}px`;
            styles.backgroundColor = this.block.color;
            break;
        }

        // set right side
        switch (this.block.side) {
          case 'right':
            styles.right = `${50 - this.block.step * 10}%`;
            break;
          case 'left':
            styles.left = `${50 - this.block.step * 10}%`;
            break;
        }

        return styles
      },
      blockClass(){
        return {
          'block': true,
          'triangle': this.block.shape === 'triangle',
          'circle': this.block.shape === 'circle',
          'rectangle': this.block.shape === 'rectangle'
        }
      }
    }
  }
</script>

<style scoped lang="less">
    .block{
        display:flex;
        align-items: center;
        justify-content: center;
        position:relative;
    }
    .circle {
        border-radius: 50%;
    }
    .triangle {
        width: 0;
        height: 0;
        line-height: 4rem;
        border-style: solid;
        .weight-num{
            position:absolute;
            top: 50%;
        }
    }
</style>
