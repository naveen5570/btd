import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAsbvCNNQtjdpOaFegWSlIRBKN1JEOJOj4",
        authDomain: "btda-d0fea.firebaseapp.com",
        databaseURL: "https://btda-d0fea.firebaseio.com",
        projectId: "btda-d0fea",
        storageBucket: "btda-d0fea.appspot.com",
        messagingSenderId: "76011062194",
        appId: "1:76011062194:web:e06b1472603d3e554d1aab",
        measurementId: "G-QBPXYSLWS9"


      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      };

      this.db.push(message);
    });
  };

  parse = message => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user
    };
  };

  get = callback => {
    this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
