<template>
  <header class="header-login-signup">
    <div class="header-limiter">
      <h1>
        <router-link to="/home" exact>
          NUS
          <span>Planner</span>
        </router-link>
      </h1>
      <nav>
        <ul v-if="user==null">
          <li>
            <router-link to="/login" exact>Login</router-link>
          </li>
          <li>
            <router-link to="/signup" exact>Sign up</router-link>
          </li>
        </ul>
        <v-toolbar-title class="title">
          <ul v-if="user!=null">
            <li>
              <v-btn icon small class="btn">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </li>
            <li>{{user.displayName}}</li>
            <li>
              <router-link to="/groups" exact>Groups</router-link>
            </li>
            <li>
              <router-link to="/dashboard" exact>Dashboard</router-link>
            </li>
            <li>
              <a @click="logout">Log out</a>
            </li>
          </ul>
        </v-toolbar-title>
      </nav>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  background-color: white;
}

.title {
  font-size: 13px;
}

.header-login-signup {
  background-color: #292c2f;
  box-shadow: 0 1px 1px #ccc;
  padding: 10px;
  height: 60px;
  color: #ffffff;
  box-sizing: border-box;
}

.header-login-signup .header-limiter {
  max-width: 95%;
  text-align: center;
  margin: 0 auto;
}

/* Logo */

.header-login-signup .header-limiter h1 {
  float: left;
  font: normal 28px Cookie, Arial, Helvetica, sans-serif;
  line-height: 40px;
  margin: 0;
}

.header-login-signup .header-limiter h1 span {
  color: #5383d3;
}

/* The navigation links */

.header-login-signup .header-limiter a {
  color: #ffffff;
  text-decoration: none;
}

.header-login-signup .header-limiter nav {
  font: 16px Arial, Helvetica, sans-serif;
  line-height: 40px;
  float: right;
  margin: 0 0 0 60px;
  padding: 0;
}

.header-login-signup .header-limiter nav a {
  font-size: 14px;
  display: inline-block;
  padding: 0 5px;
  opacity: 0.9;
  text-decoration: none;
  line-height: 1;
}

.header-login-signup .header-limiter nav a:hover {
  opacity: 1;
}

.header-login-signup .header-limiter nav a.selected {
  color: #608bd2;
}

/* Login/Sign up buttons */

.header-login-signup .header-limiter ul {
  font: 14px Arial, Helvetica, sans-serif;
  list-style: none;
  line-height: 1;
  float: right;
}

.header-login-signup .header-limiter ul li {
  display: inline-block;
  margin-left: 15px;
  opacity: 0.9;
  margin-top: 10px;
}

.header-login-signup .header-limiter ul li:hover {
  opacity: 1;
}

.header-login-signup .header-limiter a {
  cursor: pointer;
}
/* The sign up button */

.header-login-signup .header-limiter ul li:last-child {
  /*font-weight: bold;*/
  background-color: #3a3c3e;
  padding: 10px 15px;
  border-radius: 3px;
}

/* Active router links */
.router-link-active {
  font-weight: bold;
}

/* Making the header responsive */

@media all and (max-width: 600px) {
  .header-login-signup {
    padding: 25px;
    height: 85px;
  }

  .header-login-signup .header-limiter h1 {
    float: none;
    margin: -8px 0 2px;
    text-align: center;
    font-size: 24px;
    line-height: 1;
  }

  .header-login-signup .header-limiter nav {
    margin: 0;
    float: none;
  }

  .header-login-signup .header-limiter nav li a {
    font-size: 13px;
  }

  .header-login-signup .header-limiter ul {
    display: none;
  }
}
</style>