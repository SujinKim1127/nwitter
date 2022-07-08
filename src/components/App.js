import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {  // 로그인 상태로 변경
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);    // init 상태를 변경
    });
  }, []);

  // 삼항 연산자로 init 상태 감시
  return (
    <>
        {init ? (
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
            ) : (
              "initializing..."
            )} 
    </>
  );
}

export default App;
