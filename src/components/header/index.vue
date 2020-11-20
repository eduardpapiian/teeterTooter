<template>
    <header class="header">
        <div class="header_action-btn-wrapper" @click="changeGameStatus(gameStatus)">
            <font-awesome-icon :icon="gameStatus === 'stopped' ? 'play' : 'pause'" class="action-btn"/>
        </div>
    </header>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Header",
    computed:{
      ...mapState({
        gameStatus: state => state.gameStatus
      })
    },
    methods: {
      changeGameStatus(gameStatus) {
        switch (gameStatus){
          case 'stopped':
            this.$store.dispatch('startGame');
            break;
          case'inProgress':
            this.$store.dispatch('stopGame');
            break;
        }
      }
    }
  }
</script>

<style scoped lang="less">
    .header{
        display:flex;
        align-items:center;
        justify-content: center;
        padding:10px;
        background-color: #41b883;
        &_action-btn-wrapper{
            width:100px;
            height:100px;
            border-radius: 50%;
            border: 1px solid black;
            display:flex;
            align-items:center;
            justify-content: center;
            cursor:pointer;
            .action-btn {
                width:40px;
                height:40px;
            }
        }
    }
</style>
