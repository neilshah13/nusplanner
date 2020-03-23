<template>
  <v-container class="cont">
    <v-app-bar dark>
        <v-toolbar-title>Groups Created</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col v-for="(group, i) in groups" :key="i" cols="12">
          <v-card :color="group.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="group.name"></v-card-title>
                <v-card-subtitle v-text="group.module" align="left"></v-card-subtitle>
                <v-card-text v-text="group.members" align="left"></v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      groups: [
        {
          color: '#1F7087',
          name: 'Team Work',
          module: 'BT3103',
          members: 'Neil, Gerald, Weisheng, Carine, Kohmin, Xuehui'
        },
        {
          color: '#952175',
          name: 'Team Hustle',
          module: 'IS3103',
          members: 'Shah, Tan, Chang, Tan, Koh, Tan'
        },
      ],
    }),
  }
</script>

<style scoped>
.cont {
    width: 50%;
}
</style>