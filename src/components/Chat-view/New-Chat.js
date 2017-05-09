import React, {Component} from 'react'
import {
	Text, 
	View, 
	StyleSheet, 
	Button, 
	Image,
	ScrollView
} from 'react-native'
import Nav from '../Nav'
import {connect} from 'react-redux'
import {getUsers} from '../../ducks/users-duck'

class NewChat extends Component{
	componentDidMount(){
		this.props.getUsers()
	}

	render(){
		return(
			<Nav>
				<ScrollView>
					{this.props.users.map(user => {
						return (
							<View style={styles.container} key={user.id}>
								<Image style={styles.profile} source={{uri: user.image}} />
								<Text style={styles.text}>{user.name}</Text>
								<Button 
									title="Message" 
									onPress={()=>this.props.history.push('/Chat-With/' + user.id)} />
							</View>
						)
					})}
			</ScrollView>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	profile: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	text: {
		fontSize: 16
	}
})

export default connect( state=>({ 
	users: state.usersDuck.users
}), {
	getUsers
})(NewChat)

