<template>
  <div class="event-panel">debug Panel </div>
</template>

<script>

export default {
  name: 'CustomEvent',
  props: {
  }
}
</script>

<style>
	.event-panel {
    width: 300px;
    height: 300px;
		top: 20%;
    left: 1%;
    position: absolute;
		float: right;
    z-index: 2;
		background: azure;
	}
</style>
