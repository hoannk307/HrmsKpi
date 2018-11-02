
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input,Button ,Text} from 'native-base';
import { StyleSheet,Image,AsyncStorage,View } from 'react-native'

import imgLogo from './../../images/logo.jpg'
import metrics from './../../config/metrics'
const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

type Props = {};
class Login extends Component<Props> {

  constructor(){
    super();
    this.user = '{"userName":"","password":"","hoten":"","chucdanh":"","tenchucdanh":""}';

    this.state = {
      userName: '',
      password:'',
      server: ''
    }
  }


componentDidMount(){
  AsyncStorage.getItem('@server').then((value)=>  this.setState({ server: value }) );
  AsyncStorage.getItem('@user').then((value)=> { let json = JSON.parse(value);  this.setState({ userName: json.userName,password :json.password })  } );
}

  login(userName,password,server) {
  sussefull = false;
  loginThis = this;
  let url = 'http://'+server+'/HRMS/remoting/kpidata/login/';

  // let url = 'http://10.1.3.193:8082/HRMS/remoting/kpidata/login/';
    fetch( url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW5ANDIx'
      },
  body: JSON.stringify({
    user: userName,
    pass: password,
  }),
  })
  .then(response => {
            response.json().then(function(data) {
              sussefull = true;
              loginThis.user = '{"userName":"'+userName+'","password":"'+password+'","hoten":"'+data.ten+'","chucdanh":"'+data.chucdanh+'","tenchucdanh":"'+data.tenchucdanh+'"}';
              AsyncStorage.setItem('@user', loginThis.user);
              AsyncStorage.setItem('@server', server);
          }).catch(function(error) {
            console.log(data);
            console.log(error);
          alert('Kiểm tra lại user/password');
      });
    }).catch(error => {
      return alert('Kiểm tra lại thông tin Server');
    });

    //this.props.navigation.navigate('Home',{user: loginThis.user})
   setTimeout(() => {if(sussefull===true) this.props.navigation.navigate('Home',{user: loginThis.user}) }, 1000)
  }

  render() {
    //let user = Object.assign({}, this.state.user);
  //  let json = JSON.parse(this.user);
    return (
      <Container style={styles.container}>
        <Content style={styles.contend}>
          <Form >
            <View >
              <Image  style={styles.logoImg} source={imgLogo} />
            </View>
            <Item last>
              <Input placeholder="Username" value={this.state.userName}
                onChangeText={(value) => {this.setState({ userName: value })} }/>
            </Item>
            <Item last>
              <Input placeholder="Password" secureTextEntry={true} value={this.state.password}
                onChangeText={(value) => {this.setState({ password: value }) }   } />
            </Item>
            <Item last>
              <Input  placeholder="Địa chỉ máy chủ" value={this.state.server}
                onChangeText={(value) => this.setState({ server: value })} />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.login(this.state.userName,this.state.password,this.state.server)}>
            <Text>Đăng nhập</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT
  },
  contend:{
    flexDirection: 'column',
    backgroundColor: 'white'//
  },

  logoImg: {
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 5
  },
  bottom: {
    backgroundColor: '#1976D2'
  }
})

export default Login;
