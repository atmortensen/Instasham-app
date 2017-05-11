import React, {Component} from 'react'
import {TouchableHighlight, View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import myAxios from '../../../my-axios'

class ChatSelection extends Component{
	constructor(){
		super()

		this.state = {
			user: {}
		}
	}

	componentDidMount(){
		myAxios(this.props.token).get('/users/findOne/' + this.props.id).then(response => {
			this.setState({user: response.data})
		})
	}

	render(){
		return(
			<TouchableHighlight onPress={()=>this.props.history.push('/Chat-With/' + this.props.id)}>
				<View>
					<Text>{this.state.user.name}</Text>
					<Image source={{uri: this.state.user.image}} style={styles.image} />
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = {
	image: {
		height: 65,
		width: 65,
		borderRadius: 65
	}
}

export default connect( state=>({ 
	token: state.profilesDuck.token
}), {

})(ChatSelection)