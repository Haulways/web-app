import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './components/context/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import ThemeProvider from './components/context/ThemeProvider';
import { HMSRoomProvider } from '@100mslive/react-sdk';




ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
          <AuthContextProvider>
               <ThemeProvider>
                    <HMSRoomProvider>
                         <App />
                    </HMSRoomProvider>
               </ThemeProvider>
          </AuthContextProvider>
     </Provider>
     
);
