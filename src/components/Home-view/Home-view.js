import React, {Component} from 'react'
import {
	Text, 
	StyleSheet, 
	Image, 
	Dimensions, 
	ScrollView,
	TouchableHighlight
} from 'react-native'
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
		this.loadImages = this.loadImages.bind(this)
	}

	loadImages(){
		axios({
			method: 'get',
			url: 'https://guarded-inlet-23236.herokuapp.com/getUrls',
			headers: {'Authorization': this.props.token}
		}).then(response => {
			this.setState({urls: response.data.reverse()})
		})
	}

	deleteImage(url){
		axios({
			method: 'delete',
			url: 'https://guarded-inlet-23236.herokuapp.com/removeUrl/?url=' + url,
			headers: {'Authorization': this.props.token}
		}).then(() => {
			this.loadImages()
		})
	}

	componentDidMount(){	
		this.loadImages()
	}

	render(){
		return(
			<Nav>
				<ScrollView>
					<Text>Home Route</Text>
					
					{this.state.urls.map( image => {
						return (
							<TouchableHighlight 
								key={image.id} 
								onPress={this.deleteImage.bind(this, image.url)}>
								<Image 
								source={{uri: image.url}} 
								style={{
									width: viewWidth, 
									height: viewWidth
								}} />
							</TouchableHighlight>
						)
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
