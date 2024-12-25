<template>
  <div className="countdown">
    <h1>注册会计师考试(2025-08-23)倒计时</h1>
    <div v-if="countdown > 0">
      <span>{{ days }}</span> 天
      <span>{{ hours }}</span> 小时
      <span>{{ minutes }}</span> 分钟
      <span>{{ seconds }}</span> 秒
    </div>

    <div>
      <a href="https://cpaexam.cicpa.org.cn/">注册会计师全国统一考试网上报名入口</a>
      <a href="https://cpaexam.cicpa.org.cn/files/articlehtml/statichtml/01/0000018BFF19B498C0B03256BD2BB543.html">考试报名时间和考试时间入口</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: this.calculateCountdown(),
      interval: null
    };
  },
  computed: {
    days() {
      return Math.floor(this.countdown / (60 * 60 * 24));
    },
    hours() {
      return Math.floor((this.countdown % (60 * 60 * 24)) / (60 * 60));
    },
    minutes() {
      return Math.floor((this.countdown % (60 * 60)) / 60);
    },
    seconds() {
      return Math.floor(this.countdown % 60);
    }
  },
  methods: {
    calculateCountdown() {
      const newYear = new Date('August 23, 2025 00:00:00').getTime();
      const now = new Date();
      return Math.max((newYear - now) / 1000, 0);
    },
    startCountdown() {
      this.interval = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  },
  mounted() {
    this.startCountdown();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.countdown {
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 2em;
}
</style>
