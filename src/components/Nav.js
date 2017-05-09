import React, { Component } from 'react'
import {View, Image} from 'react-native'
import {Link} from  'react-router-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Nav extends Component{

	render(){
		return(
			<View style={styles.container}>

				<View style={[styles.navBar, styles.top]}>
					<Link underlayColor="#cccccc" to='/Search'>
						<Icon name='search' style={styles.icon} />
					</Link>
					<Link underlayColor="transparent" to='/Home'>
						<Image source={require('../images/logo_360.png')} />
					</Link>
					<Link underlayColor="#cccccc" to='/Chat'>
						<Icon name='send' style={styles.icon} />
					</Link>
				</View>

				<View style={styles.container}>
					{this.props.children}
				</View>

				<View style={styles.navBar}>
          <Link underlayColor="#cccccc" to='/Home'>
	          <Icon name='home' style={styles.icon} />
	        </Link>
          <Link underlayColor="#cccccc" to='/Camera'>
	          <Icon name='camera-alt' style={styles.icon} />
	        </Link>
          <Link underlayColor="#cccccc" to='/Profile'>
	          <Icon name='person' style={styles.icon} />
	        </Link>
	      </View>

			</View>
		)
	}
}

const styles = {
	navBar:{
		alignItems: 'center',
		elevation: 2,
		backgroundColor: '#f2f2f2',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	icon: {
		color: '#262626',
		fontSize: 32,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15
	},
	active: {
		color: '#999999'
	},
	container: {
		flex: 1
	}
}


