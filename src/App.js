// App.js
import React from 'react';
import DefaultPage from './pages/DefaultPage';
import { LanguageProvider } from './components/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <DefaultPage />
      </div>
    </LanguageProvider>
  );
}

export default App;
