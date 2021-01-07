// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCvF0ok_yBuRpPOXuZAmigjykjgK2LV2eU",
  authDomain: "rdr2-42a04.firebaseapp.com",
  projectId: "rdr2-42a04",
  storageBucket: "rdr2-42a04.appspot.com",
  messagingSenderId: "1040254241793",
  appId: "1:1040254241793:web:3b6753a5da8ab8d4e94400",
  measurementId: "G-0K3ZE0YCVB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// get pins owner from url or use default
var owner = 'general'
try {
  owner = location.toString().split('?')[1].split('=')[1]
} catch (e) {
  console.log(' parse owner from url error ')
}
let isListening = false

let db = firebase.firestore()
var fireDB = {
  save: async function (data) {
    try {
      await db.collection('pins').doc(owner).set({ owner, data });
    } catch (error) {
      console.error("Error setting document: ", error);
    }
  },
  load: async function () {
    try {
      const ownerPinsRef = db.collection('pins').doc(owner);
      const doc = await ownerPinsRef.get();
      return doc
    } catch (error) {
      console.error("Error loading user's pins", error)
    }
  },
  listen: async function (cb) {
    if (isListening) return
    isListening = true
    db.collection('pins').doc(owner)
      .onSnapshot(function(doc) {
        cb(doc);
      });
  }
}
