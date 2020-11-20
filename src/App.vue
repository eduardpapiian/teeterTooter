<template>
  <div id="app">
    <Header/>
    <drop-down-wrapper/>
    <bottom-wrapper/>
    <game-over-modal v-if="gameOver"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from "@/components/header/index";
import DropDownWrapper from "@/components/dropDownWrapper/index";
import BottomWrapper from "@/components/bottomWrapper/index";
import GameOverModal from "./components/gameOverModal/index";
export default {
  name: 'App',
  components: {
    GameOverModal,
    BottomWrapper,
    DropDownWrapper,
    Header
  },
  computed:{
    ...mapState({
      gameOver: state => state.gameOver
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
