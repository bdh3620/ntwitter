import AppRouter from "components/Router";
import { useState, useEffect } from "react";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,} from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => { 
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
  setIsLoggedIn(true);
  const uid = user.uid;
  } else {
  setIsLoggedIn(false);
  }
  setInit(true);
  });
  }, []);
  return (
    <>
      {init ?<AppRouter isLoggedIn = {isLoggedIn} /> : "Initializing.."}
      <footer>&copy; {new Date().getFullYear()} Ntwitter</footer>
    </>
  );

}

export default App;




