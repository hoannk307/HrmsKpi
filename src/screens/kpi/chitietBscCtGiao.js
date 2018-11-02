import React, { Component } from 'react'
import {StyleSheet, View,AsyncStorage} from 'react-native'
import { Container, Header, Content, Form, Item, Input,Button,
  Text,Footer,Label,Left,Body,Title,Icon,Toast,Card,CardItem,StyleProvider } from 'native-base';
  import getTheme from './../../theme/components';
  import material from './../../theme/variables/material';

export default class BscCtGiao extends Component {

  constructor(props){
       super(props);
       const { params } = props.navigation.state;
       this.state ={
           isBaoCao:params.isBaoCao,
           user: "",
           server: ""
       }

       this.data = [ ];
       //this.isBaoCao = false;
       this.isYeuTo = false;
       this.yeuto = params ? params.yeuto : null;
       this.idChiTieuGiao = params ? params.idChiTieuGiao : null;
       this.tenChiTieu = params ? params.tenChiTieu : null;
       this.kqThucHien = params ? params.kqThucHien : null;

    }

    componentDidMount(){
      AsyncStorage.getItem('@user:key').then((value)=>  this.setState({ user: value }));
      AsyncStorage.getItem('@server').then((value)=> this.setState({ server: value }) );
    }


   themYeuTo(id,value,idChiTieuGiao){
     let check = false;

     //neu da ton tai --> update lai gia tri
     for (var key in this.data) {
      if (this.data.hasOwnProperty(key)) {
         if(this.data[key].idDmChitieuYeuto == id){
           this.data[key].giatri = value;
           check = true;
           break;
         }
      }
     }
     // them moi yeu to
     if(check == false) this.data.push({idDmChitieuYeuto: id.toString(), giatri: value.toString(),idChitieuGiao:idChiTieuGiao.toString()});
     //data.items.splice(1, 3);
   }


   guiBaoCao(){
    var user = "";
    let success = 'false';

      let url = 'http://'+ this.state.server +'/HRMS/remoting/kpidata/saveBaoCaoKPI/'+this.kqThucHien+'/'+this.idChiTieuGiao+'/'+this.state.user+'/';
      fetch( url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(this.data)
      })
      .then((response) => {response.json().then(
        function(data) {
          success = 'true';
          Toast.show({
            text: "Lưu dữ liệu thành công",
            buttonText: "Okay",
            type: "success"
          })
      }
    ) .catch(function(error) {
    alert(error);
  });}

      ) .catch((error) => {
        console.log(error);
        console.log(JSON.stringify(this.data ));
      });

      //alert(success);
      //setTimeout(() => { this.setState({isBaoCao: success,}) }, 1000)
      this.setState({isBaoCao: 'true',});

   }


   render() {

    let kpiDetail = this;
    let form =  null;
    if(this.yeuto.length != 0){
        this.isYeuTo = true;
        this.kqThucHien = 'null';
       form = this.yeuto.map(function (data) {
        return(
          <View key={data.id}>
          <Item >
            <Label>{data.ten}:</Label>
            <Input
              disabled
              placeholder = {data.giatri} keyboardType='numeric' />
           </Item>
          </View>
      );
    });
  }else{
    this.isYeuTo = false;
    const arr = [1];
    form = arr.map(function () {
     return(
       <View>
       <Item >
         <Label>Kết quả thực hiện:</Label>
         <Input
           disabled
           placeholder = {kpiDetail.kqThucHien} keyboardType='numeric' />
        </Item>
     </View>

    );
    });
}


     return(
       <StyleProvider style={getTheme(material)}>
       <Container>
         <Header>
           <Left>
             <Button transparent onPress={
               () => this.props.navigation.goBack()
               // this.props.navigation.navigate('Home', {
               //    onGoBack: () => this.getData(),
               //  });
             }>
              <Icon name="arrow-back" />
            </Button>
           </Left>
           <Body>
             <Title>Báo cáo kết quả </Title>
           </Body>
         </Header>
        <Content>
              <Label style={{fontWeight:'bold',fontSize:18,textAlign:'center',color: '#0066cc'}}>{this.tenChiTieu}</Label>
              {(() => {
                if(this.state.isBaoCao === 'true')
                return (
                  <Label style={{color:'red',textAlign:'center'}} >Chỉ tiêu đã báo cáo</Label>
                );
              })()}






              <Form>
              {form}
            </Form>

           </Content>
         </Container>
       </StyleProvider>
     );
   }
}
