import Vue from 'vue'
import Vuex from 'vuex'
const constants = require('../../consts');

const { generateBlock } = require('../../blockGenerator');

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    gameStatus: 'stopped',
    rightBlocks: [generateBlock('right')],
    startFallingLeftBlocks: [generateBlock('left'), generateBlock('left')],
    fallingDownBlock: {
      inAction: false,
      weight: null,
      shape: null,
      color: null,
      step: null,
      side: null,
      size: null
    },
    leftBlocks: [],
    speed: constants.speed,
    gameOver: false
  },
  mutations: {
    stopGame(state) {
      state.gameStatus = 'stopped'
    },
    startNewGame(state, payload) {
      state.gameStatus = 'inProgress';

      state.fallingDownBlock.inAction = true;
      state.fallingDownBlock.weight = payload.weight;
      state.fallingDownBlock.shape = payload.shape;
      state.fallingDownBlock.color = payload.color;
      state.fallingDownBlock.step = payload.step;
      state.fallingDownBlock.side = payload.side;
      state.fallingDownBlock.size = payload.size
    },
    continueGame(state) {
      state.gameStatus = 'inProgress'
    },
    rightMove(state){
      state.fallingDownBlock.step--
    },
    leftMove(state){
      state.fallingDownBlock.step++
    },
    setLeftFallingBlock(state, payload){
      const block = {
        weight: payload.weight,
        shape: payload.shape,
        color: payload.color,
        step: payload.step,
        side: payload.side,
        size: payload.size
      };
      state.leftBlocks.push(block);

      state.fallingDownBlock.inAction = false;
    },
    generateNewLeftBlock(state){
      state.startFallingLeftBlocks.push(generateBlock('left'))
    },
    generateNewRightBlock(state){
      state.rightBlocks.push(generateBlock('right'))
    },
    restartGame(state){
      state.gameOver = true
    }
  },
  getters: {
    getRightSideIndex: state => state.rightBlocks.reduce((acc, item) => acc += item.weight * item.step, 0),
    getLeftSideIndex: state => state.leftBlocks.reduce((acc, item) => acc += item.weight * item.step, 0),
    countIncline: (state, getters) => {

      if (!getters.getRightSideIndex) return -30;
      if (!getters.getLeftSideIndex) return 30;
      if (getters.getRightSideIndex === getters.getLeftSideIndex) return 0;
      if (getters.getLeftSideIndex > getters.getRightSideIndex) {
        if ((getters.getLeftSideIndex - getters.getRightSideIndex) / getters.getLeftSideIndex * -100 < -30) {
          state.gameStatus = 'stopped';
          state.gameOver = true;
          return
        }
        state.speed = state.speed - 20;
        return (getters.getLeftSideIndex - getters.getRightSideIndex) / getters.getLeftSideIndex * -100;
      }

      if (getters.getLeftSideIndex < getters.getRightSideIndex) {
        if ((getters.getRightSideIndex - getters.getLeftSideIndex) / getters.getRightSideIndex * 100 > 30) {
          state.gameStatus = 'stopped';
          state.gameOver = true;
          return
        }
        state.speed = state.speed - 20;
        return (getters.getRightSideIndex - getters.getLeftSideIndex) / getters.getRightSideIndex * 100;
      }
    }
  },
  actions: {
    stopGame(context){
      context.commit('stopGame')
    },
    startGame(context){
      // check if user start game or continue
      if (!context.state.fallingDownBlock.inAction) {
        const fallingBlock = context.state.startFallingLeftBlocks.splice(0, 1)[0];
        context.commit('startNewGame', fallingBlock);
      } else {
        context.commit('continueGame');
      }
    },
    rightMove(context) {
      context.commit('rightMove');
    },
    leftMove(context) {
      context.commit('leftMove');
    },
    fallingEnds(context, payload) {
      context.commit('setLeftFallingBlock', payload);
      context.commit('generateNewLeftBlock');
      context.commit('generateNewRightBlock');
      const fallingBlock = context.state.startFallingLeftBlocks.splice(0, 1)[0];
      context.commit('startNewGame', fallingBlock);
    },
    restartGame(context){
      context.commit('restartGame');
    }
  }
})
