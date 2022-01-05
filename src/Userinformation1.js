import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import { scale, scaleVertical } from "./utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import Globals from '../Globals';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),


  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

class Signup extends Component {
  validateNumber = () => {
    const { mobile_number } = this.state
    const regex_mobile = /^\d{10}$/;
    if (mobile_number == '') {
      alert('Enter mobile number')
      return false
    }
    fetch('https://2factor.in/API/V1/7fbaed71-1738-11ea-9fa5-0200cd936042/SMS/' + mobile_number + '/AUTOGEN2')
      .then(response => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        this.setState({
          session_id: responseJson.Details
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any

  }

  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye',
    mobile_number: "",
    otp: "",
    session_id: "eddb26c8-b304-4769-9b66-2af1c91c8fe8"
  }

  goToLogin = () => this.props.navigation.navigate('SignIn')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }))
  }

  handleOnSignup = async (values, actions) => {
    const { name, email, password } = values

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, name, uid }
        await this.props.firebase.createNewUser(userData)
        this.props.navigation.navigate('Profile')
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const { navigation } = this.props;
    const mobile_number = navigation.getParam('mobile_number', 'NO-number');
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            check: false
          }}
          onSubmit={(values, actions) => {
            this.handleOnSignup(values, actions)
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
              <Fragment>
                <TextInput style={{
                  marginTop: 50, fontSize: 20, margin: 15,
                  marginVertical: scaleVertical(6),
                  padding: 18,
                  borderColor: '#00b8ff',
                  borderWidth: .5,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  textAlign: 'center'
                }}
                  name='name'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder='Enter your full name'
                  iconName='md-person'
                  iconColor='#2C384A'
                  onBlur={handleBlur('name')}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <TextInput style={{
                  marginTop: 5, fontSize: 20, margin: 10,
                  marginVertical: scaleVertical(6),
                  padding: 18,
                  borderColor: '#00b8ff',
                  borderWidth: .5,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  textAlign: 'center'
                }}
                  name='Phone Number'
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  placeholder='Mobile Number'
                  iconName='md-mobile'
                  iconColor='#2C384A'
                  onBlur={handleBlur('phone')}
                />

                <TextInput style={{
                  marginTop: 5, fontSize: 20, margin: 10,
                  marginVertical: scaleVertical(6),
                  padding: 18,
                  borderColor: '#00b8ff',
                  borderWidth: .5,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  textAlign: 'center'
                }}
                  name='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder='Enter password'
                  iconName='ios-lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('password')}
                  secureTextEntry={passwordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={passwordIcon} size={28} color='grey' />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <TextInput style={{
                  marginTop: 5, fontSize: 20, margin: 10,
                  marginVertical: scaleVertical(6),
                  padding: 18,
                  borderColor: '#00b8ff',
                  borderWidth: .5,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  textAlign: 'center'
                }}
                  name='password'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder='Confirm password'
                  iconName='ios-lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry={confirmPasswordVisibility}
                  rightIcon={
                    <TouchableOpacity
                      onPress={this.handleConfirmPasswordVisibility}>
                      <Ionicons
                        name={confirmPasswordIcon}
                        size={28}
                        color='grey'
                      />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
                <CheckBox
                  containerStyle={styles.checkBoxContainer}
                  checkedIcon='check-box'
                  iconType='material'
                  uncheckedIcon='check-box-outline-blank'
                  title='Agree to terms and conditions'
                  checkedTitle='You agreed to our terms and conditions'
                  checked={values.check}
                  onPress={() => setFieldValue('check', !values.check)}

                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.submitButton}>
                    <GradientButton

                      style={{ marginTop: 8 }}
                      textStyle={{ fontSize: 20 }}
                      height={50}

                      onPress={handleSubmit}
                      text=" SUBMIT"
                      buttonColor='#00b8ff'
                      gradientBegin="#00b8ff"
                      gradientEnd="#0083ff"
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                      onPressAction={() => this.props.navigation.navigate("pro1")}

                    />
                  </TouchableOpacity>
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
        </Formik>

        <Button
          title='Have an account? Login'
          onPress={() => this.props.navigation.navigate("signin3")}
          titleStyle={{
            color: '#039BE5'
          }}
          type='clear'
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f7ff',

  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 5,
    marginTop: 5,
    padding: 10,


  },
  checkBoxContainer: {

    borderColor: '#fff',
    marginTop: 5, fontSize: 20, margin: 10,
    marginVertical: scaleVertical(6),
    padding: 18,
    borderColor: '#00b8ff',
    borderWidth: .5,
    borderRadius: 50,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  submitButton: {

    height: 50,
    borderRadius: 0,
    borderColor: '#03a9f4',


  },
})

export default withFirebaseHOC(Signup)
