import {LogBox, Text, View} from 'react-native';
import StackNavigator from './src/navigator/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {LanguageContextProvider} from './src/components/LanguageContext';
import {LoaderProvider} from './src/components/LoaderContext';

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <LanguageContextProvider>
      <LoaderProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </LoaderProvider>
    </LanguageContextProvider>
  );
};
export default App;
