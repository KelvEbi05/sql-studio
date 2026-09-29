import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig={apiKey:'AIzaSyA9zz_MezbIEWaaqz3V8yW-RpH7JEyNPlw',authDomain:'sql-studio-81c50.firebaseapp.com',projectId:'sql-studio-81c50',storageBucket:'sql-studio-81c50.firebasestorage.app',messagingSenderId:'57204049737',appId:'1:57204049737:web:ab3a49a86646ff078e3c98',measurementId:'G-24WWY4DEPE'};
const app=initializeApp(firebaseConfig);const auth=getAuth(app);let analytics;
try{analytics=getAnalytics(app);}catch{}
const track=(name,params={})=>{try{if(analytics)logEvent(analytics,name,params);}catch{}};
window.sqlStudioAuth={
  async google(){const result=await signInWithPopup(auth,new GoogleAuthProvider());track('login',{method:'google'});return result.user;},
  async register(name,email,password){const result=await createUserWithEmailAndPassword(auth,email,password);if(name)await updateProfile(result.user,{displayName:name});track('sign_up',{method:'email'});return result.user;},
  async login(email,password){const result=await signInWithEmailAndPassword(auth,email,password);track('login',{method:'email'});return result.user;},
  track
};
onAuthStateChanged(auth,user=>{window.dispatchEvent(new CustomEvent('sqlstudioauthready',{detail:{user}}));});