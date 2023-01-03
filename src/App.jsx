import { useState } from "react";

import { Home } from "./Home";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export function App() {
  const [user, setUser] = useState();

  if (user){
    return <Home loggedInUser={user}/>
  }

  return window.location.pathname === '/signup'
  ? <SignUp signInUser={setUser}/> 
  : <Login signInUser={setUser} />;
}
