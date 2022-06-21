import React, {useState, useEffect} from "react"
import {View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Torch from "react-native-torch"
import RNShake from 'react-native-shake'

const App = () => {
    //const toggle = false
    const [toggle, setToggle] = useState(false)

    const handleChanceToggle = () => setToggle (oldToggle => !oldToggle)

    useEffect(() => {
        Torch.switchState(toggle)
        // console.log('Trocou o flash')

    }, [toggle])

    useEffect(() => {
        //Para quando o celular for chaqualado.
        const subscription = RNShake.addListener(() => {
            setToggle (oldToggle => !oldToggle)
        })
        //Quando esta função vai ser chamada quando o componente for ser desmontado
        return () => subscription.remove()
    }, [])

    return <View style={toggle ? style.containerLight : style.container}>
        <TouchableOpacity onPress={handleChanceToggle}>

            <Image style={toggle ? style.lightingOn : style.lightingOff} 
                source={toggle ? require('./assets/icons/eco-light.png') : require('./assets/icons/eco-light-off.png')} /> 
            <Image style={style.lightingOn} 
                source={toggle ? require('./assets/icons/logo-dio.png') : require('./assets/icons/logo-dio-white.png')} /> 
        </TouchableOpacity>
    </View>
}

export default App

const style = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerLight: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    lightingOn:{
        resizeMode: 'contain',
        alignSelf: "center",
        width: 150,
        height: 150
    },
    lightingOff:{
        resizeMode: 'contain',
        alignSelf: "center",
        tintColor: 'white',
        width: 150,
        height: 150
    }
})