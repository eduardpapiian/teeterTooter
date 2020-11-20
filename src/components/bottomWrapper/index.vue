<template>
    <div class="bottom-wrapper">
        <teeter-tooter-line/>
        <div class="triangle">
             <img class="vue-logo" alt="Vue logo" src="../../assets/logo.png">
        </div>
    </div>
</template>

<script>
  import TeeterTooterLine from "@/components/teetertooterLine/index";
  export default {
    name: "BottomWrapper",
    components: {TeeterTooterLine}
  }
</script>

<style scoped lang="less">
    .bottom-wrapper{
        margin: 0 10%;
    }
    .triangle{
        margin:0 auto;
        max-height:250px;
        max-width:250px;
    }
    .vue-logo{
        width:100%;
        height:100%;
        transform: rotate(180deg);
        margin-top: -18px
    }
</style>
