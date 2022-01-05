import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';



class HomePage extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                />
                <View style={styles.dashboard}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SugarInput")}>

                        <View style={{
                            backgroundColor: 'red',
                            height: 150,
                            margin: 5,
                            width: 170,
                            Icon: 'ios-create',


                        }}>
                            <Icon style={styles.itemIcon} size={80} name={Icon} onPress={() => this.props.navigation.navigate('SugarInput')} />


                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("SugarInput")} >SUGAR INPUT</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(items) => this.props.navigation.navigate('LoginScreen')}>
                        <View style={{
                            backgroundColor: '#ef0202', icon: 'gratipay',
                            height: 150,
                            margin: 5,
                            width: 170,
                            Icon: 'ios-chatboxes',
                        }}>
                            <Icon style={styles.itemIcon} size={80} name={Icon} onPress={(items) => this.props.navigation.navigate('LoginScreen')} />

                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("LoginScreen")} >CONSULT DOCTOR</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("addmedi")}>
                        <View style={{
                            backgroundColor: '#efcf02', icon: 'heart',
                            height: 150,
                            margin: 5,
                            width: 170,
                        }}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("addmedi")} >MEDICINE</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Recipe")}>
                        <View style={{
                            backgroundColor: '#ef5802',
                            height: 150,
                            margin: 5,
                            width: 170,
                        }}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Recipe")} >RECIPE</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Membership")}>
                        <View style={{
                            backgroundColor: '#02cbef',
                            height: 150,
                            margin: 5,
                            width: 170,
                        }}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Membership")} >MEMBERSHIP</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Events")}>
                        <View style={{
                            backgroundColor: '#02ef1d',
                            height: 150,
                            margin: 5,
                            width: 170,
                        }}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Events")} >UPCOMING EVENTS</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
                        <View style={{
                            backgroundColor: '#efcf02',
                            height: 150,
                            margin: 5,
                            width: 170,
                        }}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("LoginScreen")} >CONSULT NUTRITIONIST</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SugarInput")}>
                        <View style={{
                            backgroundColor: '#ef0202',
                            height: 150,
                            margin: 5,
                            width: 170,
                        }}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Events")} >BTD BRAODCASTS</Text>

                        </View>
                    </TouchableOpacity>




                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    dashboard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    box: {
        backgroundColor: '#00BCD4',
        height: 150,
        margin: 5,
        width: 170,

    },
    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 150,
        margin: 5,
        backgroundColor: '#00BCD4'

    }
    ,

    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',

    },
    itemIcon: {
        color: '#00b8ff',
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
        marginLeft: 20,
    }

});


export default HomePage;
