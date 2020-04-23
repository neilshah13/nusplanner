<template>
  <v-sheet class="whole">
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
                <p class="outer">
                  <v-container class="header">
                    {{announcement.module_id}}:
                    <i>
                      <strong>{{announcement.coordinator}} </strong>
                    </i>
                    <p class="date">{{announcement.date_posted}}</p>
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
            >Close</btn>
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
  color: #36486b;
}
.outer {
  font-size: 14px;
  color: #36486b;
  background: white;
  margin: 10px;
}

.cont {
  font-size: 13px;
  color: white;
  background: #36486b;
  position: relative;
}
.header {
  font-size: 13px;
  color: white;
  background: #36486b;
}
.txt {
  padding: 10px;
  font-size: 11px;
}
.date {
  padding: 10px;
  font-size: 11px;
}
.contain {
  color: #36486b;
  background: white;
  max-width: 150px;
  font-size: 14px;
  padding: 0;
  /* transform: scale(0.85); */
  cursor: pointer;
  margin-top: 3px;
  max-height: 300px;
}
.contain-outer {
  color: #36486b;
  background: white;
  max-width: 200px;
  font-size: 14px;
  padding: 0;
  /* transform: scale(0.82); */
  cursor: pointer;
  max-height: 300px;
}
.btn {
  background-color: #36486b;
  color: white;
  padding: 10px;
}
.list {
  overflow-y: scroll;
  max-height: 300px;
  height: 300px;
}
.whole {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
