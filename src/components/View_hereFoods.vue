<template>
  <v-content>
    <v-container>
    
     <div id="map" style="width:100%;height:350px;"></div>      
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    kakaoMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new daum.maps.LatLng(37.497265466062686, 126.98373547836339), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      var map = new daum.maps.Map(mapContainer, mapOption);
    }
  },
  mounted() {
    this.kakaoMap();
  }
};
</script>
