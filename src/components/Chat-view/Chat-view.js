import React, {Component} from 'react'
import {View, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'

class Chat extends Component{

	render(){
		return(
			<Nav>
				<View style={styles.button}>
					<Button onPress={()=>this.props.history.push('/New-Chat')}  title="Start a new chat" />
				</View>
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
	state: state
}), {

})(Chat)