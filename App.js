import React,{ Component } from 'react'
import { Button,StyleSheet,View } from 'react-native'

export default class TimerLogger extends Component {

  state = { 
    curTime:''
  }
  
  componentDidMount() {
    setInterval(function(){
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }.bind(this),1000)
  }

  onSave =()=> {
    //React Native FileSystem Imported for Performing File_Manupulations
    let RNFS = require('react-native-fs')
    const Path = RNFS.DocumentDirectoryPath + '/test.txt'
    RNFS.exists(Path)
    .then( success=> {
      if(success){
        RNFS.appendFile(Path,'\r\n'+this.state.curTime,'utf8')
      }else{
       RNFS.writeFile(Path,this.state.curTime)
      }
    })
    .catch( err=> {
      console.log(err.message)
    })
  }

  render() {
    return(
      <View style={styles.container}> 
        <View style={styles.buttonContainer}>
          <Button
             onPress={this.onSave}
             title='Press Me'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  
  buttonContainer: {
    backgroundColor:'#abc9e8',
    textDecorationColor:'red',
    borderRadius:10,
    margin: 90,
  },
});