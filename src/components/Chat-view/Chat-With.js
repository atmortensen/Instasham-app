import React, {Component} from 'react'
import {
	Text, 
	View, 
	StyleSheet, 
	ScrollView,
	TextInput,
	TouchableHighlight
} from 'react-native'
import Nav from '../Nav'
import {connect} from 'react-redux'
import {getUsers} from '../../ducks/users-duck'
import {newMessage, getMessages} from '../../ducks/chat-duck'
import Icon from 'react-native-vector-icons/MaterialIcons'
import io from 'socket.io-client'

console.ignoredYellowBox = ['Setting a timer for a long period of time']

class ChatWith extends Component{
	constructor(){
		super()

		this.state = {
			text: ''
		}
	}

	componentDidMount(){
		this.socket = io('http://192.168.1.128:3000', {
		  transports: ['websocket']
		})
		const room = [this.props.profile.id, this.props.match.params.id].sort().join('_')
		this.socket.emit('join', room)
		this.socket.on('newMessage', () => {
			this.props.getMessages(this.props.profile.id, this.props.match.params.id)
		})

		this.props.getMessages(this.props.profile.id, this.props.match.params.id)
		// this.props.getUsers()
	}

	componentWillUnmount(){
		this.socket.disconnect()
	}

	sendMessage(){
		this.props.newMessage(this.props.profile.id, this.props.match.params.id, this.state.text)
		this.setState({text: ''})
	}

	render(){
		return(
			<Nav>
				<ScrollView style={styles.chat}>
					<Text>{JSON.stringify(this.props.messages)}</Text>
				</ScrollView>
				<View style={styles.textBox}>
					<TextInput
						style={styles.text}
		        onChangeText={(text) => this.setState({text})}
		        value={this.state.text} />
		      <TouchableHighlight onPress={this.sendMessage.bind(this)}>
		      	<Icon style={styles.icon} name='arrow-forward' />
		      </TouchableHighlight>
	      </View>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	textBox: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 5
	},
	text: {
		flex: 1
	},
	icon: {
		fontSize: 30,
		padding: 5
	},
	chat: {
		flex: 1
	}
})

export default connect( state=>({ 
	profile: state.profilesDuck.profile,
	messages: state.chatDuck.messages
}), {
	getUsers, newMessage, getMessages
})(ChatWith)
