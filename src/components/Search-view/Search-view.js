import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import {logout} from '../../reducers/profileReducer'

class Search extends Component{

	render(){
		return(
			<Nav>
				<Text>Search Route</Text>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	redux: state
}), {
	logout
})(Search)