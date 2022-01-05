import React, { Component, Fragment } from 'react'
import { Text, SafeAreaView, View, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import Globals from '../Globals';


const validationSchema = Yup.object().shape({

})


class ForgotPassword extends Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values

    try {
      await this.props.firebase.passwordReset(email)
      Alert.alert('Password reset Code sent successfully')
      this.props.navigation.navigate('OTP')
    } catch (error) {
      actions.setFieldError('general', error.message)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
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
            isSubmitting
          }) => (
              <Fragment>
                <FormInput
                  name='email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder='Enter Registered Number'
                  autoCapitalize='none'
                  iconName='ios-phone-portrait'
                  iconColor='#2C384A'
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title='Send OTP'
                    buttonColor='#039BE5'
                    disabled={!isValid || isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
        </Formik>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 150
  },
  text: {
    color: '#333',
    fontSize: 24,
    marginLeft: 25
  },
  buttonContainer: {
    margin: 25
  }
})

export default withFirebaseHOC(ForgotPassword)
