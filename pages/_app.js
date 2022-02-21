import React from 'react';
import { CacheProvider } from '@emotion/react';
import { useStore } from '../store';
import { Provider } from 'react-redux';
import createEmotionCache from '../utility/createEmotionCache';


import '../styles/globals.css';



const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>    
            <Component {...pageProps} />
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;