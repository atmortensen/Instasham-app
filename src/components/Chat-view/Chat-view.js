import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Button, Text} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import ChatSelection from './subcomponents/ChatSelection'
import {getChats} from '../../ducks/chat-duck'

class Chat extends Component{

	componentDidMount(){
		this.props.getChats(this.props.profile.id)
	}

	chats(chats){
		let ChatElement = []
		for(var prop in chats){
			ChatElement.push(<ChatSelection history={this.props.history} key={prop} id={prop} chat={chats[prop]} />)
		}
		return ChatElement
	}

	render(){
		return(
			<Nav>
				<ScrollView>
					<View style={styles.button}> 
						<Button onPress={()=>this.props.history.push('/New-Chat')}  title="Start a new chat" />
					</View>
					{this.chats(this.props.chats)}
				</ScrollView>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10
	}
})

export default connect( state=>({ 
	profile: state.profilesDuck.profile,
	chats: state.chatDuck.chats
}), {
	getChats
})(Chat)