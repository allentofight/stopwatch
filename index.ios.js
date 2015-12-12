var formatTime = require('minutes-seconds-milliseconds');
var React = require('react-native');
var {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} = React;

var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime:null,
      laps:[]
    }
  },

  render: function(){
    return <View style={styles.container}>
      <View style={[styles.header, this.border('yellow')]}>  
        <View style={[styles.timerWrapper,this.border('red')]}>
          <Text style={styles.timer}>
          {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper,this.border('green')]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      
      <View style={[styles.footer, this.border('blue')]}>  
        {this.laps()}
      </View>
    </View>
  },
  laps: function() {
    return this.state.laps.map(function(time,index){
      return <View key={index} style={styles.lap}>
        <Text key={index} style={styles.lapText}>
        Lap #{index+1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton:function(){
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight 
    underlayColor="gray"
    onPress={this.handleStartPress}
    style={[styles.button,style]}
    >
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  handleLapPress:function() {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      //注意这里用concat而不用push是因为，我们不然改变原来的lap的状态
      //而希望返回一个全新的数组
      laps:this.state.laps.concat([lap])
    })
  },
  lapButton:function() {
    return <TouchableHighlight 
    style={styles.button}
    underlayColor="gray"
    onPress={this.handleLapPress}
    >
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },
  handleStartPress: function() {  
    if (this.state.running) {
      clearInterval(this.interval); 
      this.setState({running: false});
      return;
    } 
    
    var startTime = new Date();
    this.setState({startTime: new Date()});
    this.interval = setInterval(() => {
      this.setState({
        running: true,
        timeElapsed : new Date()-this.state.startTime
      });
    }, 30);
  },
  border: function(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'stretch'
  },
  header:{  
    flex:1
  },
  footer:{  
    flex:1
  },
  timerWrapper:{
    flex: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonWrapper:{
    flex: 3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  timer:{
    fontSize:60
  },
  button:{
    borderWidth: 2,
    height:100,
    width:100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton:{
    borderColor:'#00CC00'
  },
  stopButton:{
    borderColor:'#CC0000'
  },
  lap:{
    justifyContent:'space-around',
    flexDirection:'row'
  },
  lapText:{
    fontSize: 30
  }
});

// AppRegistry.registerComponent('stopwatch',function(){
//   return StopWatch;
// })
//is the same as the following
AppRegistry.registerComponent('stopwatch',() => StopWatch);