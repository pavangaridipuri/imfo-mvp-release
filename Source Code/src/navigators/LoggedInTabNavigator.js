
import { TabNavigator, TabBarBottom } from 'react-navigation';
import FollowingContainer from '../containers/FollowingContainer';
import InboxContainer from '../containers/InboxContainer';
import ProfileContainer from '../containers/ProfileContainer';
import RegisterContainer from '../containers/RegisterContainer';
import MYS from '../containers/MYSContainer';
import colors from '../styles/colors';

const LoggedInTabNavigator = TabNavigator({
  FollowingContainer: { screen: FollowingContainer },
  RegisterContainer: { screen: RegisterContainer },
  MYSContainer: { screen: MYS }, 
  ProfileContainer: { screen: ProfileContainer}
}, {
  tabBarOptions: {
  	labelStyle: {
  	  fontWeight: '600',
  	  marginBottom: 5,
  	},
    activeTintColor: colors.pink
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
});

export default LoggedInTabNavigator;