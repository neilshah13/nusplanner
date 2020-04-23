<template v-if="todo.length">
  <main id="todolist">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <h1>
      What are you doing today?
    </h1>
    <transition-group name="todolist" tag="ul">
      <li v-for="item in todoByStatus" v-bind:class="item.done ? 'done' : ''" v-bind:key="item.id">
        <span class="label" v-show="item.edit == false">{{item.label}}</span>
        <textarea v-show="item.edit == true" 
          v-model="item.label" 
          v-on:keyup.enter="doneEditing(item)"/>
        <div class="actions">
          <button
            class="btn-picto"
            type="button"
            v-on:click="markAsDoneOrUndone(item)"
            v-bind:aria-label="item.done ? 'Undone' : 'Done'"
            v-bind:title="item.done ? 'Undone' : 'Done'"
            v-show="item.edit == false"
          >
            <i
              aria-hidden="true"
              class="material-icons"
            >{{ item.done ? 'check_box' : 'check_box_outline_blank' }}</i>
          </button>
          <button
            class="btn-picto"
            type="button"
            v-on:click="deleteItemFromList(item)"
            aria-label="Delete"
            title="Delete"
            v-show="item.edit == false"
          >
            <i aria-hidden="true" class="material-icons">delete</i>
          </button>
          <button
            class="btn-picto"
            type="button"
            v-on:click="editItemFromList(item)"
            aria-label="Edit"
            title="Edit"
            v-show="item.edit == false"
          >
            <i aria-hidden="true" class="material-icons">edit</i>
          </button>
          <button
            class="btn-picto"
            type="button"
            v-on:click="doneEditing(item)"
            aria-label="Done Editing"
            title="Done Editing"
            v-show="item.edit == true"
          >
            <i aria-hidden="true" class="material-icons">done</i>
          </button>
        </div>
      </li>
    </transition-group>
    <togglebutton label="Move done items at the end?" name="todosort" v-on:clicked="clickontoogle" />
    <!-- <p v-else class="emptylist">Your todo list is empty.</p> -->
    <form name="newform" v-on:submit.prevent="addItem">
      <label for="newitem">Add to the todo list</label>
      <input type="text" name="newitem" id="newitem" v-model="newitem" required/>
      <button type="submit">Add item</button>
    </form>
  </main>
</template>

<script>
import firebase from "firebase"
import togglebutton from "./togglebutton.vue";

//import func from '../../vue-temp/vue-editor-bridge';
export default {
  components: {
    togglebutton
  },
  data: function() {
    return {
      newitem: "",
      sortByStatus: false,
      todo: [
        /*{ id: 1, label: "IS4241: Learn Gephi", done: true, edit: false },
        { id: 2, label: "BT3102: Regression", done: false, edit: false },
        { id: 3, label: "BT3103: Learn Vue", done: false, edit: false }*/
      ]
    };
  },
  methods: {
      async fetchItems() {
      let todo=[]
      let item={}
      await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //console.log("Signed in..")
          //console.log(user.uid)
          firebase.firestore().collection('users').doc(user.uid)
          .collection('todo').orderBy('label').get().then((querySnapShot) => {
            querySnapShot.forEach(doc=>{
              item=doc.data()
              item.id=doc.id
              todo.push(item)
            })
          })
        }
      })
      this.todo=todo
    },
    async addItem() {
      // this.todo.push({
      //   id: Math.floor(Math.random() * 9999) + 10,
      //   label: this.newitem,
      //   done: false,
      //   edit: false
      // });
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('users').doc(user.uid)
      .collection('todo').add({
        label: this.newitem,
        done: false,
        edit: false,
        uid: user.uid
      })
      this.newitem = "";
      this.fetchItems()
    },
    async markAsDoneOrUndone(item) {
      item.done = !item.done;
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('users').doc(user.uid)
      .collection('todo').doc(item.id).update({
        done:item.done
      })
    },
    async deleteItemFromList(item) {
      let index = this.todo.indexOf(item);
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('users').doc(user.uid)
      .collection('todo').doc(item.id).delete()
      this.todo.splice(index, 1);
    },
    editItemFromList: function(item) {
      item.edit = true;
    },
    async doneEditing(item) {
      item.edit = false;
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('users').doc(user.uid)
      .collection('todo').doc(item.id).update({
        label:item.label
      })
    },
    clickontoogle: function(active) {
      this.sortByStatus = active;
    }
  },
  created(){
      this.fetchItems()
  },
  computed: {
    todoByStatus: function() {
      if (!this.sortByStatus) {
        return this.todo;
      }

      var sortedArray = [];
      var doneArray = this.todo.filter(function(item) {
        return item.done;
      });
      var notDoneArray = this.todo.filter(function(item) {
        return !item.done;
      });

      sortedArray = [...notDoneArray, ...doneArray];
      return sortedArray;
    }
  }
};

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}

#todolist {
  resize: auto;
  margin-top: 15px;
  min-width: 10px;
  padding: 2rem 2rem 3rem;
  background: #36486b;
  color: #fff;
  /* box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1); */
  transform: scale(0.85); /* scales entire todo-list smaller */
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 1.5rem;
  font-family: 'Marker Felt';
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
/* #todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
} */

#todolist .emptylist {
  /* margin-top: 2.6rem; */
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
#todolist ul {
  margin-top: 1rem;
  margin-left: -30px;
  margin-right:-15px;
  list-style: none;
  overflow-y: scroll;
  max-height: 480px;
  min-height:300px;
}
#todolist .todolist-move {
  transition: transform 1s;
}
#todolist li {
  display: flex;
  margin: 0 0rem 4px;
  padding: 1rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  word-break: break-word;
  text-align: left;
}
#todolist li:hover{
  background-color: rgba(255, 255, 255, 0.349);
}
#todolist .actions {
  padding-left: 0.7em;
  display: flex;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
  display: flex;
  animation-name: strike;
}
#todolist .done .label {
  opacity: 0.6;
  text-decoration: line-through;
}
#todolist .done .label::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  /* animation: strikeitem 0.3s ease-out 0s forwards; */
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #fff;
}
#todolist textarea {
  background: #f7f1f1;
  color: #36486b;
  border: none;
}

/* FORM */
form {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
}
form label {
  min-width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
  width: 50%;
}
form button {
  padding: 0 1.3rem;
  border: none;
  background: #445b88;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s ease-out;
}
form button:hover {
  background: #36486b;
}
form input,
form button {
  height: 3rem;
}
form input {
  color: black;
}
</style>