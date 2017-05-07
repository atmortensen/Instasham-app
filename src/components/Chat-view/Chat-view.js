import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'

class Chat extends Component{
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