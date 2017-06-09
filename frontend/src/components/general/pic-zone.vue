<template>
  <div class="container">
    <div class="row">
    <b-form-input v-model="srcImgInput" :style="styleURL" placeholder="url"
      type="text" :lazy-formatter="false" @input="" class="col"></b-form-input>
    <b-button @click="loadImage">load</b-button>
    </div>
    <dropzone id="myVueDropzone" url="https://httpbin.org/post" ref="myUniqueID"
      :thumbnailWidth="thumbnailWidth" :thumbnailHeight="thumbnailHeight"
      :useFontAwesome="useFontAwesome" :maxNumberOfFiles="maxNumberOfFiles"
      :vdropzone-success="showSuccess" class="row"></dropzone>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone';

export default {
  name: 'PicZone',
  components: {//{{{
    Dropzone,
  },//}}}
  props: {//{{{
    type: "",
    id: "",
  },//}}}
  data() {//{{{
    const paramDropzone = {
      maxNumberOfFiles: 1,
      maxFileSizeInMB: 0.3,
      useFontAwesome: true,
      thumbnailWidth: 128,
      thumbnailHeight: 128,
    };
    return {
      styleURL: { },
      srcImgInput: "",
      srcImg: "https://raw.githubusercontent.com/asm-jaime/vue-d3-gallery/master/docs/harold.jpg",
      img: new Image,
      text: '',
      ...paramDropzone,
    };
  },//}}}
  methods: {
    loadImage: function() {//{{{
      console.log(this.$refs.myUniqueID.dropzone.options);
      if(this.ImageExist(this.srcImgInput)){
        const mockFile = { name: "some.jpg", size: 12345 };
        const dropzone = this.$refs.myUniqueID.dropzone;
        Object.assign(dropzone.options, this.paramDropzone);
        console.log('options: ', dropzone.options);
        dropzone.options.addedfile.call(dropzone, mockFile);
        dropzone.options.thumbnail.call(dropzone, mockFile, this.srcImgInput);
        mockFile.previewElement.classList.add('dz-success');
        mockFile.previewElement.classList.add('dz-complete');
        this.img.src = this.srcImgInput;
        this.draw();
      } else {
        this.styleURL = {
          background: '#F00',
          transitionProperty: 'background',
          transitionDuration: '0.6s',
        };
        setTimeout(()=>{this.styleURL = {
          background: '#FFF',
          transitionProperty: 'background',
          transitionDuration: '0.3s',
        };}, 600);
        console.log('img does not exist');
      };
    },//}}}
    ImageExist: function(url) {//{{{
       const img = new Image();
       img.src = url;
       return img.height != 0;
    },//}}}
    showSuccess: function (file) {//{{{
      const img = document.getElementsByTagName("img")[0];
      this.srcImgInput = img.alt;
      this.img.src = img.src;
      this.draw();
    },//}}}
  },
}
</script>

<style>
  .menu-gallery {
    max-width: 600px;
    padding: 1.5rem;
    border: solid #f7f7f9;
  }
</style>
