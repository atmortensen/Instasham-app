import React, {Component} from 'react'
import {
	View, 
	Image, 
	StyleSheet, 
	Button
} from 'react-native'
import {connect} from 'react-redux'
import {login, checkToken} from '../../reducers/profileReducer'

class Login extends Component{

  componentWillMount(){
    this.props.checkToken()
  }

  componentWillReceiveProps(newProps){
    if(newProps.profile){
       this.props.history.push('/Home')
    } 
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>
        	<Image source={require('../../images/logo_medium.png')} />
        </View>
        {!this.props.loading && 
        	<Button 
	        	onPress={this.props.login} 
	        	title="Login with Facebook" />
        }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	header: {
		marginBottom: 45,
		alignItems: 'center'
	}
})

export default connect(state => ({ 
	profile: state.profileReducer.profile,
	loading: state.profileReducer.loading
}), {
	login, checkToken
})(Login)
