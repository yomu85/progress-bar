<template>
  <v-content>
    <v-container>
      <div>
        <v-btn color="info" id="spin" @click="spin">룰렛돌리기</v-btn>
      </div>
      <div style="text-align:center;">
        <canvas id="canvas" width="320" height="320"></canvas>
      </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      options: [
        "전주밥집",
        "개미식당",
        "양자강",
        "쌀국수",
        "떡볶이",
        "초밥",
        "짜글이"
      ],
      startAngle: 0,
      startAngleStart: 0,
      spinTimeout: null,
      spinArcStart: 10,
      spinTime: 0,
      spinTimeTotal: 0,
      ctx: ""
    };
  },
  computed: {
    arc: function() {
      return Math.PI / (this.options.length / 2);
    }
  },
  methods: {
    byte2Hex: function(n) {
      var nybHexString = "0123456789ABCDEF";
      return (
        String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
        nybHexString.substr(n & 0x0f, 1)
      );
    },
    RGB2Color: function(r, g, b) {
      return "#" + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    },
    getColor: function(item, maxitem) {
      var phase = 0;
      var center = 128;
      var width = 127;
      var frequency = (Math.PI * 2) / maxitem;

      var red = Math.sin(frequency * item + 2 + phase) * width + center;
      var green = Math.sin(frequency * item + 0 + phase) * width + center;
      var blue = Math.sin(frequency * item + 4 + phase) * width + center;

      return this.RGB2Color(red, green, blue);
    },

    drawRouletteWheel: function() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var outsideRadius = 150;
        var textRadius = 110;
        var insideRadius = 75;
        this.ctx = canvas.getContext("2d");
        this.ctx.clearRect(0, 0, 320, 320);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.font =
          "bold 16px Helvetica, Arial, 'Malgun Gothic', '맑은 고딕'";
        for (var i = 0; i < this.options.length; i++) {
          var angle = this.startAngle + i * this.arc;
          //this.ctx.fillStyle = colors[i];
          this.ctx.fillStyle = this.getColor(i, this.options.length);
          this.ctx.beginPath();
          this.ctx.arc(160, 160, outsideRadius, angle, angle + this.arc, false);
          this.ctx.arc(160, 160, insideRadius, angle + this.arc, angle, true);
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.save();
          this.ctx.shadowOffsetX = -1;
          this.ctx.shadowOffsetY = -1;
          this.ctx.shadowBlur = 0;
          this.ctx.shadowColor = "rgb(220,220,220)";
          this.ctx.fillStyle = "black";
          this.ctx.translate(
            160 + Math.cos(angle + this.arc / 2) * textRadius,
            160 + Math.sin(angle + this.arc / 2) * textRadius
          );
          this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
          var text = this.options[i];
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
          this.ctx.restore();
        }
        //Arrow
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(160 - 4, 160 - (outsideRadius + 5));
        this.ctx.lineTo(160 + 4, 160 - (outsideRadius + 5));
        this.ctx.lineTo(160 + 4, 160 - (outsideRadius - 5));
        this.ctx.lineTo(160 + 9, 160 - (outsideRadius - 5));
        this.ctx.lineTo(160 + 0, 160 - (outsideRadius - 13));
        this.ctx.lineTo(160 - 9, 160 - (outsideRadius - 5));
        this.ctx.lineTo(160 - 4, 160 - (outsideRadius - 5));
        this.ctx.lineTo(160 - 4, 160 - (outsideRadius + 5));
        this.ctx.fill();
      }
    },
    spin: function() {
      this.spinAngleStart = Math.random() * 10 + 10;
      this.spinTime = 0;
      this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
      this.rotateWheel();
    },
    rotateWheel: function() {
      this.spinTime += 30;
      if (this.spinTime >= this.spinTimeTotal) {
        this.stopRotateWheel();
        return;
      }
      var spinAngle =
        this.spinAngleStart -
        this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
      this.startAngle += (spinAngle * Math.PI) / 180;
      this.drawRouletteWheel();
      let _this = this;
      this.spinTimeout = setTimeout(function() {
        _this.rotateWheel();
      }, 30);
    },
    stopRotateWheel: function() {
      clearTimeout(this.spinTimeout);
      var degrees = (this.startAngle * 180) / Math.PI + 90;
      var arcd = (this.arc * 180) / Math.PI;
      var index = Math.floor((360 - (degrees % 360)) / arcd);
      this.ctx.save();
      this.ctx.font =
        "bold 28px Helvetica, Arial, 'Malgun Gothic', '맑은 고딕'";
      var text = this.options[index];
      console.log(index, text, this.options);
      this.ctx.fillText(
        text,
        160 - this.ctx.measureText(text).width / 2,
        160 + 10
      );
      this.ctx.restore();
    },
    easeOut: function(t, b, c, d) {
      var ts = (t /= d) * t;
      var tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    }
  },
  mounted() {
    this.drawRouletteWheel();
  }
};
</script>

<style>

</style>
