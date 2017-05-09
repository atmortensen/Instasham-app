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
import myAxios from '../../my-axios'

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
		myAxios(this.props.token).get('/getUrls')
		.then(response => {
			this.setState({urls: response.data.reverse()})
		})
	}

	deleteImage(url){
		myAxios(this.props.token).delete('/removeUrl/?url=' + url)
		.then(() => {
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
	token: state.profilesDuck.token
}), {
	// Imported Actions
})(Home)
