import Navbar from "./components/NavBar";
import Promotion from "./components/Promotion";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { check } from "./http/userAPI";
import { Spinner } from "@chakra-ui/react";

const App = observer (() => {

  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true);
    }).catch(error => {
      console.log('Ошибка проверки аутентификации:', error);
      user.setIsAuth(false);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Spinner size="xl" />
  };
  
  return (
    <>

        <Navbar />
        <Promotion />
        <AppRouter />
    
    </>
  )
});

export default App;
