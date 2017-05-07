import React, { Component } from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {Link} from  'react-router-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Nav extends Component{
	constructor(){
		super()
		this.state = {
			btnSelected: 1
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={[styles.navBar, styles.top]}>
					<Link to='/Search'><Icon name='search' size={32} color='#262626'/></Link>
					<Link to='/Home'><Image source={require('../images/logo_360.png')} /></Link>
					<Link to='/Chat'><Icon name='send' size={32} color='#262626'/></Link>
				</View>
				<View style={styles.container}>
					{this.props.children}
				</View>
				<View style={styles.navBar}>
          <Link to='/Home'><Icon name='home' size={32} color='#262626' /></Link>
          <Link to='/Camera'><Icon name='camera-alt' size={32} color='#262626' /></Link>
          <Link to='/Profile'><Icon name='person' size={32} color='#262626' /></Link>
	      </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBar:{
		alignItems: 'center',
		elevation: 2,
		backgroundColor: '#f2f2f2',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15
	},
	top: {
		// paddingTop: 35
	},
	container: {
		flex: 1
	},
	btnSelected: {
		color:'grey'
	},
	notSelected : {
		color:'#262626'
	}
})



