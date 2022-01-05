import React from 'react';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5
  },
  inputMessage: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginBottom: 10,
    borderRadius: 20
  },
  btnText: {
    color: '#f0f',
    fontSize: 20,
  },
  bottomBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2,
    height: 60,
    width: '100%'
  },
  searchIcon: {
    padding: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  sendButton: {
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    height: 40,
    width: 40,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: '#2196F3',
    borderRadius: 20,
  },
  //Doctor Dashboard Screen Styles
  DocDashboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  DocDashboardImage: {
    flex: 1,
    height: hp('20%'),
    width: wp('47%')
  },
  DocDashboardContainerView: {
    backgroundColor: '#F7F7F7',
    height: hp('30%'),
    margin: 5,
    width: wp('47%'),
  },
  GridViewInsideTextItemStyle: {
    color: '#000000',
    padding: 10,
    fontSize: 17,
    justifyContent: 'center',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  header: {
    backgroundColor: "#ffffff",
    width: '100%'
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    width: '100%',
    alignContent: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  itemIcon: {
    color: '#00b8ff',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
    fontStyle: 'italic'
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    marginLeft: -280,
    marginTop: -10,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: 10,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#000000",
  },

});

export default styles;