<template>
  <v-card color="blue-grey">
    <v-card-title primary-title class="justify-center">
      <v-row align="left">
        <v-btn icon dark @click="groupMembers = false" color="warning" outlined>
          <!-- closing button -->
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>
    <v-card color="blue-grey darken-1" dark :loading="isUpdating">
      <template v-slot:progress>
        <v-progress-linear absolute color="green lighten-3" height="4" indeterminate></v-progress-linear>``
      </template>
      <v-img height="200" src="../..//public/teamwork.jpg">
        <v-row>
          <v-col class="text-right" cols="12">
            <v-menu bottom left transition="slide-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="isUpdating = true">
                  <v-list-item-action>
                    <v-icon>mdi-settings</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Update</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-row class="pa-4" align="center" justify="center">
            <v-col class="text-center">
              <h3 class="headline">{{ name }}</h3>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
      <v-form>
        <v-container>
          <v-row>
            <v-card-text class="menu">
              Choose Module :
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn outlined v-on="on" class="btn" dark filled>
                    <span>{{ modules[module] }}</span>
                    <v-icon bottom>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="module='module1'">
                    <v-list-item-title>BT1101</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="module='module2'">
                    <v-list-item-title>BT2101</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="module='module3'">
                    <v-list-item-title>BT2102</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="module='module4'">
                    <v-list-item-title>BT3102</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="module='module5'">
                    <v-list-item-title>BT3103</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="module='module6'">
                    <v-list-item-title>IS3103</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-text>

            <v-col cols="12">
              <v-text-field
                class="groupname"
                v-model="name"
                :disabled="isUpdating"
                outlined
                color="blue-grey lighten-2"
                label="Group Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12">
              <v-autocomplete
                class="groupmembers"
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                filled
                dense
                chips
                color="blue-grey lighten-2"
                label="Select"
                item-text="name"
                item-value="name"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >{{ data.item.name }}</v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      /* for the group project button */
      autoUpdate: true,
      friends: ["Gerald Tan", "Neil Shah"],
      isUpdating: false,
      name: "Teamwork Makes the Dream Work!",
      people: [
        { header: "Users" },
        { divider: true },
        { name: "Gerald Tan" },
        { divider: true },
        { name: "Neil Shah" },
        { divider: true },
        { name: "Wei Sheng" },
        { divider: true },
        { name: "Koh Min" },
        { divider: true },
        { name: "Carine" },
        { divider: true },
        { name: "Xue Hui" },
        { divider: true },
        { name: "Phillip" },
        { divider: true },
        { name: "Holgate" },
        { divider: true }
      ]
      /* end group project button */
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.groupname {
  color: black !important;
}
</style>