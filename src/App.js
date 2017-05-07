import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeRouter, Route} from  'react-router-native'
import {Provider} from 'react-redux'
import store from './store'

import Home from './components/Home-view/Home-view'
import Login from './components/Login-view/Login-view'
import Profile from './components/Profile-view/Profile-view'
import Search from './components/Search-view/Search-view'
import Chat from './components/Chat-view/Chat-view'
import Camera from './components/Camera-view/Camera-view'							

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<NativeRouter>
					<View style={styles.container}>
						<Route path='/' exact component={Login}/>
						<Route path='/Home' component={Home}/>
						<Route path='/Profile' component={Profile}/>
						<Route path='/Camera' component={Camera}/>
						<Route path='/Search' component={Search}/>
						<Route path='/Chat' component={Chat}/>
					</View>
				</NativeRouter>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
})
