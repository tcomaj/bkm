<template>
  <div>
    <button @click="() => captureAndDownload()">Capture and download</button>
    <div>
      <img ref="finalImage" src="" style="max-width: 100%; height: auto" />
    </div>
    <div ref="displayImage" class="display-image">
      <img
        :style="`position: absolute; top: 0; left: 0; z-index: 0`"
        src="/specific/2022-2023/bkm-lucenec/event/_template.png"
      />
      <img
        :style="`position: absolute; top: 0; left: 0; z-index: 1`"
        :src="image"
      />
      <span></span>

      <img
        :style="`position: absolute; top: 0; left: 0; z-index: 2`"
        src="/specific/2022-2023/bkm-lucenec/event/_template-mask.png"
      />
      <span
        :style="`
          position: absolute;
          bottom: 44px;
          left: 0px;
          width: 100%;
          z-index: 10;
          text-align: center;
        `"
      >
        <h1
          :style="`
            font-size: 75pt;
            color: #040000;
            position: relative;
            top: 7px;
            text-transform: uppercase;
            margin: 0;
            padding: 0;
            line-height: 1.1;
            letter-spacing: -0.04em;
          `"
        >
          <span v-html="query.headline"></span>
        </h1>
        <p
          :style="`
            font-size: 30pt;
            text-transform: uppercase;
            padding: 0;
            margin: 0;
            margin-top: 26px;
            letter-spacing: -0.04em;
            color: white;
          `"
        >
          {{ query.round }}, <b>Niké SBL</b>&nbsp;&nbsp;//&nbsp;&nbsp;{{
            query.date
          }}
          ({{ query.dayname }}) o {{ query.time }}&nbsp;&nbsp;//&nbsp;&nbsp;<img
            src="/specific/2022-2023/bkm-lucenec/event/_icon-location.png"
            style="position: relative; top: 3px; margin-right: 10px"
          />Lučenec
        </p>
      </span>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  head() {
    return {
      title: "Facebook Event Cover",
      link: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          href: "https://fonts.googleapis.com",
          rel: "preconnect",
        },
        {
          href: "https://fonts.gstatic.com",
          rel: "preconnect",
          crossorigin: true,
        },
        {
          href:
            "https://fonts.googleapis.com/css2?family=Nunito:wght@400;800&display=swap",
          rel: "stylesheet",
        },
      ],
    };
  },
  computed: {
    image() {
      return `/specific/${this.path}/${this.query.image}`;
    },
  },
  methods: {
    captureAndDownload() {
      window.scrollTo(0, 0);

      // Convert the div to image (canvas)
      html2canvas(this.$refs.displayImage).then((canvas) => {
        this.$refs.finalImage.setAttribute(
          "src",
          canvas.toDataURL("image/png", 1.0)
        );
      });
    },
  },
  async asyncData({ params, $http, query, route }) {
    return { query, path: route.path };
  },
};
</script>

<style>
body {
  margin: 0;
}

.display-image {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 1920px;
  height: 1005px;
  border: 1px solid black;
  background-position: center;
  background-size: cover;
}
</style>