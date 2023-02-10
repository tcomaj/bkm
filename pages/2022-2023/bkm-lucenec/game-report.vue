<template>
  <div>
    <div class="main" v-if="!loaded">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div>
      <img ref="finalImage" src="" style="max-width: 100%; height: auto" />
    </div>

    <div ref="displayImage" class="container">
      <img :src="homeTeamLogo" class="home-team-logo" @load="handleImageLoad" />
      <img :src="awayTeamLogo" class="away-team-logo" @load="handleImageLoad" />
      <div class="home-score">{{ query.homeScore }}</div>
      <div class="away-score">{{ query.awayScore }}</div>
      <div class="round">{{ query.round }}</div>
      <div class="league" v-if="query.round.includes('.')">Niké SBL</div>
      <div class="league" v-else>Slovenský pohár</div>
      <img
        src="/specific/2022-2023/bkm-lucenec/game-report/_template.png?v4"
        class="image"
        style="z-index: 2"
        @load="handleImageLoad"
      />
      <img :src="image" class="image-2" @load="handleImageLoad" />
      <button @click="() => captureAndDownload()">Capture and download</button>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import getLogoUrlByTeam from "~/helpers/getLogoUrlByTeam";

export default {
  data() {
    return {
      imagesLoaded: [],
      loaded: false,
    };
  },
  watch: {
    // whenever question changes, this function will run
    imagesLoaded(newState, currentState) {
      if (newState.length === 4) {
        console.log(newState);
        let allTrue = newState.filter((item) => item === true);
        this.loaded = allTrue.length === 4;
        document.querySelector("button").click();
        this.$refs.displayImage.style.display = "none";
      }
    },
  },
  head() {
    return {
      title: "Game Report",
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
  methods: {
    handleImageLoad() {
      this.imagesLoaded.push(true);
    },
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
  mounted() {},
  computed: {
    homeTeamLogo() {
      console.log(this.query);
      return getLogoUrlByTeam(this.query.homeTeam);
    },
    awayTeamLogo() {
      return getLogoUrlByTeam(this.query.awayTeam);
    },
    image() {
      return `/specific/${this.path}/${this.query.image}`;
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
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: orange transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.main {
  height: 100vh;
  width: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  margin-top: 2000px;
  position: relative;
  width: 1000px;
  height: 1000px;
  z-index: 1;
}

.home-score {
  position: absolute;
  top: 373px;
  right: 167px;
  width: 200px;
  color: white;
  z-index: 10000;
  font-size: 110px;
  text-align: right;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.home-team-logo {
  position: absolute;
  top: 388px;
  right: 36px;
  width: 110px;
  height: 110px;
  display: block;
  z-index: 20;
  /* position: absolute;
  top: 399px;
  right: 40px;
  width: 90px;
  height: 90px;
  display: block;
  z-index: 20; */
}

.away-team-logo {
  position: absolute;
  top: 523px;
  right: 36px;
  width: 110px;
  height: 110px;
  display: block;
  z-index: 20;
}

.away-score {
  position: absolute;
  top: 503px;
  right: 167px;
  color: white;

  width: 200px;
  z-index: 10000;
  font-size: 110px;
  text-align: right;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.round {
  position: absolute;
  bottom: 105px;
  right: 42px;
  width: 340px;
  font-size: 40px;
  color: white;
  z-index: 10;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: -0.04em;
}

.league {
  position: absolute;
  bottom: 53px;
  font-weight: 900;
  right: 42px;
  width: 400px;
  font-size: 40px;
  color: white;
  z-index: 10;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: -0.04em;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
}

.image-2 {
  position: absolute;
  z-index: -1;
  width: 790px;
  height: 790px;
  top: 109px;
  left: -70px;
}
</style>