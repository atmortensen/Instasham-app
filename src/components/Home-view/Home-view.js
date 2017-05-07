import React, {Component} from 'react'
import {Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import axios from 'axios'

const viewWidth = Dimensions.get('window').width

class Home extends Component{
	constructor(){
		super()

		this.state = {
			urls: []
		}
	}

	componentDidMount(){	
		axios({
			method: 'get',
			url: 'https://guarded-inlet-23236.herokuapp.com/getUrls',
			headers: {'Authorization': this.props.token}
		}).then(response => {
			this.setState({urls: response.data.reverse()})
		})
	}

	render(){
		return(
			<Nav>
				<ScrollView>
					<Text>Home Route</Text>
					
					{this.state.urls.map( url => {
						return <Image 
							key={url.id} 
							source={{uri: url.url}} 
							style={{
								width: viewWidth, 
								height: viewWidth
							}} />
					})}
				</ScrollView>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state => ({ 
	token: state.profileReducer.token
}), {
	// Imported Actions
})(Home)
