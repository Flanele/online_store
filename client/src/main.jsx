import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './utils/theme.js';
import { createContext } from 'react';
import UserStore from './store/UserStore.js';
import { BrowserRouter } from 'react-router-dom';
import ItemStore from './store/ItemStore.js';
import CartStore from './store/CartStore.js';
import FavoriteStore from './store/FavoriteStore.js';
import CommentStore from './store/CommentStore.js';

export const Context = createContext(null);

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserStore(),
    item: new ItemStore(),
    cart: new CartStore(),
    favorite: new FavoriteStore(),
    comment: new CommentStore()
  }}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>       
      </ChakraProvider>
    </Context.Provider>
);
