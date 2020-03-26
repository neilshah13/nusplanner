<template>
  <v-sheet>
    <!-- to view announcements, to be changed to when you enter website -->
    <v-container @click="dialog = true" class="contain">
      <v-container class="cont">
        <h1>
          <strong>Announcements</strong>
        </h1>
        <txt>Click to view full</txt>
        <p></p>
        <!--first announcement -->
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
              <!--first announcement -->
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
            <!-- second announcement
            <v-card>
              <p>
                <v-container class="header">
                  IS3103:
                  <i>
                    <strong>Prof Oh</strong>
                  </i>
                  <txt>05/03/20, 12:53</txt>
                </v-container>
                <v-card-text>The tutorial on 12th March will be cancelled.</v-card-text>
              </p>
            </v-card>-->
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
//import firebase from "firebase";

export default {
  data: () => ({
    dialog: false,
    announcements: [
      {
        coordinator: "Prof Oh",
        date_posted: "13/07/2020",
        description: "Lorem Ipsum all the way",
        title: "Test12",
        module_id: "IS3103"
      },
      {
        coordinator: "Prof Rama",
        date_posted: "13/07/2021",
        description: "Lorem Ipsum all the way",
        title: "Test12333",
        module_id: "BT3103"
      }
    ]
  })
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
txt {
  padding: 10px;
  font-size: 11px;
}
.contain {
  color: rgb(42, 68, 99);
  background: white;
  max-width: 250px;
  font-size: 20px;
  padding: 0;
  transform: scale(0.8);
}
btn {
  background-color: rgb(42, 68, 99);
  color: white;
  padding: 10px;
}
</style>
