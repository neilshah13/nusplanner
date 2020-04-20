<template>
  <v-sheet>
    <!-- to view announcements, to be changed to when you enter website -->
    <v-container @click="dialog = true" class="contain-outer">
      <v-container class="cont">
        <h1>
          <strong>Announcements</strong>
        </h1>
        <txt>Click to view full</txt>
        <p></p>
        <div class="list">
        <!--minimised view of announcement -->
        <div v-for="announcement in announcements" v-bind:key="announcement.coordinator">
          <v-card>
            <p>
              <v-container class="contain">
                {{announcement.module_id}}:
                <strong>{{announcement.title}}</strong> by
                <i>{{announcement.coordinator}}</i>
                <p>{{announcement.date_posted}}</p>
              </v-container>
              <v-divider></v-divider>
            </p>
          </v-card>
        </div>
        </div>
        <v-divider></v-divider>
      </v-container>
    </v-container>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-container>
          <h2>
            <strong>Announcements</strong>
          </h2>
          <div>
            <div v-for="announcement in announcements" v-bind:key="announcement.coordinator">
              <!--detailed view of announcement -->
              <v-card>
                <p>
                  <v-container class="header">
                    {{announcement.module_id}}:
                    <i>
                      <strong>{{announcement.coordinator}}</strong>
                    </i>
                    <txt>{{announcement.date_posted}}</txt>
                  </v-container>
                  <v-card-text>
                    <strong>{{announcement.title}} :</strong>
                    {{announcement.description}}
                  </v-card-text>
                </p>
              </v-card>
            </div>
            <v-divider></v-divider>
            <btn
              class="btn"
              right
              type="submit"
              color="rgb(42, 68, 99)"
              @click.stop="dialog=false"
            >Okay</btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      dialog: false,
      announcements: [],
      modules: []
    };
  },
  mounted() {
    //console.log("Ran Announcement Code");
    this.$root.$on("announcement-module", data => {
      this.runAnnouncements(data);
    });
  },
  methods: {
    runAnnouncements(data) {
      this.modules = data;
      this.getAnnouncements();
    },
    async getAnnouncements() {
      let snapshot = await firebase
        .firestore()
        .collection("announcement")
        .get();
      let ancmt_list = [];
      snapshot.forEach(doc => {
        if (this.modules.includes(doc.data().module_id)) {
          let appData = doc.data();
          let date = appData.date_posted.toDate();
          var day = date.getDate().toString();
          var mth = (date.getMonth() + 1).toString();
          var year = date.getUTCFullYear();
          if (mth.length == 1) {
            appData.date_posted = day + "/0" + mth + "/" + year;
          } else {
            appData.date_posted = day + "/" + mth + "/" + year;
          }
          appData.id = doc.id;
          ancmt_list.push(appData);
        }
      });
      this.announcements = ancmt_list;
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
  font-size: 20px;
}
h2 {
  color: rgb(42, 68, 99);
}
p {
  font-size: 20px;
  color: rgb(42, 68, 99);
  background: white;
  margin: 10px;
}

.cont {
  font-size: 13px;
  color: white;
  background: rgb(42, 68, 99);
  position: relative;
}
.header {
  font-size: 13px;
  color: white;
  background: rgb(42, 68, 99);
  max-width: 475px;
}
.txt {
  padding: 10px;
  font-size: 11px;
}
.contain {
  color: rgb(42, 68, 99);
  background: white;
  max-width: 250px;
  font-size: 20px;
  padding: 0;
  transform: scale(0.85);
  cursor: pointer;
  margin-top: 3px;
  max-height: 300px;
}
.contain-outer {
  color: rgb(42, 68, 99);
  background: white;
  max-width: 250px;
  font-size: 20px;
  padding: 0;
  transform: scale(0.82);
  cursor: pointer;
  margin-top: 32px;
  max-height:300px;
}
.btn {
  background-color: rgb(42, 68, 99);
  color: white;
  padding: 10px;
}
.list {
  overflow-y: scroll;
  max-height: 300px;
  height: 300px;
}
</style>
