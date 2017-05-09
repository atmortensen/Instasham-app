import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import io from 'socket.io-client'

console.ignoredYellowBox = ['Setting a timer for a long period of time']

class Chat extends Component{
	constructor(){
		super()

		this.socket = io('http://192.168.1.4:3000', {
		  transports: ['websocket']
		})
	}

	componentWillUnmount(){
		this.socket.disconnect()
	}

	render(){
		return(
			<Nav>
				<Text>Chat Route</Text>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	redux: state
}), {
	// Imported Actions
})(Chat)