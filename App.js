import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './navigation/DrawerNavigator';


import Members from './screens/Members';
import Blog from './screens/Blog';
import Night from './screens/nightsky';
import Gallery from './screens/Gallery';
import Pevents from './screens/Pevent';
import Fevents from './screens/Fevent';
import Feventsd from './screens/FeventD';
import Peventsd from './screens/PeventD';
import About from './screens/AboutUs';
import DevLog from './screens/DevLog';
import Minigame from './screens/Minigame';
import Achievements from './screens/Achievements';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'Side', component: DrawerNavigator },
  { name: 'Members', component: Members },
  { name: 'Under The Night Sky', component: Night },
  { name: 'Blog', component: Blog },
  { name: 'Gallery', component: Gallery },
  { name: 'Pevent', component: Pevents },
  { name: 'Fevent', component: Fevents },
  { name: 'FeventD', component: Feventsd },
  { name: 'PeventD', component: Peventsd },
  { name: 'About us', component: About },
  { name: 'DevLog', component: DevLog },
  { name: 'Minigame', component: Minigame },
  { name: 'Achievements', component: Achievements },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
