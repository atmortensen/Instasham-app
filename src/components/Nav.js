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
					<Link underlayColor="transparent" to='/Search'><Icon name='search' style={styles.icon} /></Link>
					<Link underlayColor="transparent" to='/Home'><Image source={require('../images/logo_360.png')} /></Link>
					<Link underlayColor="transparent" to='/Chat'><Icon name='send' style={styles.icon} /></Link>
				</View>
				<View style={styles.container}>
					{this.props.children}
				</View>
				<View style={styles.navBar}>
          <Link underlayColor="transparent" to='/Home'><Icon name='home' style={styles.icon} /></Link>
          <Link underlayColor="transparent" to='/Camera'><Icon name='camera-alt' style={styles.icon} /></Link>
          <Link underlayColor="transparent" to='/Profile'><Icon name='person' style={styles.icon} /></Link>
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
	icon: {
		color: '#262626',
		fontSize: 32
	},
	active: {
		color: '#999999'
	},
	container: {
		flex: 1
	}
})



