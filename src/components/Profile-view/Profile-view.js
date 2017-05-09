import React, {Component} from 'react'
import {Text, StyleSheet, AsyncStorage, Image} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import {logout} from '../../ducks/profiles-duck'

class Profile extends Component{

	logout(){
		AsyncStorage.removeItem('token').then(() => {
			this.props.logout()
			this.props.history.push('/')
		})
	}

	render(){
		return(
			<Nav>
				<Text>{this.props.profile.name}</Text>
				<Image source={{uri: this.props.profile.image}} style={styles.profile} />
				<Text onPress={this.logout.bind(this)}>Logout</Text>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	profile: {
		height: 75,
		width: 75,
		borderRadius: 50
	}
})

export default connect( state=>({ 
	profile: state.profilesDuck.profile,
	redux: state
}), {
	logout
})(Profile)


