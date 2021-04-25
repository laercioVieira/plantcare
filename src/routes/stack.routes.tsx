import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Confirmation from '../pages/Confirmation';
import UserIdentication from '../pages/UserIdentification';
import Welcome from '../pages/Welcome';
import colors from '../styles/colors';
import PlantSelect from '../pages/PlantSelect';



const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (

    <Stack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <Stack.Screen name="Welcome" component={Welcome} />

        <Stack.Screen name="UserIdentication" component={UserIdentication} />

        <Stack.Screen name="Confirmation" component={Confirmation} />

        <Stack.Screen name="PlantSelect" component={PlantSelect} />

    </Stack.Navigator>
);

export default AppRoutes;