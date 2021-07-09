import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='HOME'/>
    <BottomNavigationTab title='MAP'/>
  </BottomNavigation>
);

export default BottomTabBar;