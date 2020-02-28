<template>
  <v-sheet>
    <!-- to view announcements, to be changed to when you enter website -->
    <v-container @click="dialog = true" class="contain">
      <v-container class="cont">
        <h1>
          <strong>Announcements</strong>
        </h1>
        <txt>[Click to view full]</txt>
        <p></p>
        <!--first announcement -->
        <v-card>
          <p>
            <v-container class="contain">
              BT3103:
              <i>
                <strong>Prof Thangamani</strong>
              </i>
              <p>[01/03/20, 16:04]</p>
            </v-container>
            <v-divider></v-divider>
          </p>
        </v-card>
        <!-- second announcement-->
        <v-card>
          <p>
            <v-container class="contain">
              IS3103:
              <i>
                <strong>Prof Oh</strong>
              </i>
              <p>[05/03/20, 12:53]</p>
            </v-container>
            <v-divider></v-divider>
          </p>
        </v-card>
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
            <!--first announcement -->
            <v-card>
              <p>
                <v-container class="header">
                  BT3103:
                  <i>
                    <strong>Prof Thangamani</strong>
                  </i>
                  <txt>[01/03/20, 16:04]</txt>
                </v-container>
                <v-card-text>The lecture on 17/03/20 will be held at LT19 instead of i3.</v-card-text>
              </p>
            </v-card>
            <!-- second announcement-->
            <v-card>
              <p>
                <v-container class="header">
                  IS3103:
                  <i>
                    <strong>Prof Oh</strong>
                  </i>
                  <txt>[05/03/20, 12:53]</txt>
                </v-container>
                <v-card-text>The tutorial on 12th March will be cancelled.</v-card-text>
              </p>
            </v-card>
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
export default {
  data: () => ({
    dialog: false
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
  max-width: 320px;
  max-height: 350px;
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
  font-size: 25px;
  padding: 0;
  transform: scale(0.8);
}
btn {
  background-color: rgb(42, 68, 99);
  color: white;
  padding: 10px;
}
</style>
