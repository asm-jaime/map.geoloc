<template>
    <div>
        <div class="row">
            <h3>
                {{name}}
            </h3>
        </div>
        <div class="row">
            <p>
                {{description}}
            </p>
        </div>
    </div>
</template>

<script>
  export default{
    props: ['name', 'description']
  }
</script>