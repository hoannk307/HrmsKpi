'use strict'
import React, { Component } from 'react'
import {AsyncStorage,StyleSheet, View,TouchableOpacity,ScrollView,ImageBackground} from 'react-native'
import { Container, Button, H3, Text,Header,Segment,Left,Body,Icon,Right,Title,Label,Grid,Col,Row,Picker,Item } from "native-base";
import BoxKpi from './../../components/BoxKpi';
import metrics from './../../config/metrics'


class DashboardCaNhan extends Component {

  constructor(props){
       super(props)
       this.state ={
          server: "",
          user:"" ,
           data:[],
           tongdiem:"",
           xeploai:"",
           loaiky: 0,
           selectedYear: new Date().getFullYear().toString(),
           kybaocao: this.getKyHienTai(0)
       }
       this.currentYear = new Date().getFullYear();
   }

  async onChangeLoaiKy(loaiky) {
    await this.setState({
       loaiky: loaiky,
       kybaocao:  this.getKyHienTai(loaiky)
     });
     this.getData(this.state.user,this.state.selectedYear,this.state.kybaocao);
   }


     async  componentDidMount() {
     try {
       let server = await AsyncStorage.getItem('@server');
       let user = await AsyncStorage.getItem('@user');
       let json = JSON.parse(user);
       this.setState({
         server: server,
         user :json.userName
        })

      // sau khi bao cao KPI: --> load lai thong tin cua ky bao cao
      const { params } = this.props.navigation.state;
        if(params !== undefined ){
          let nam = params ? params.selectedYear : null;
          let kybaocao = params ? params.kybaocao : null;
          if(nam !== undefined && kybaocao !== undefined){
            this.setState({
              selectedYear: nam,
              kybaocao :kybaocao
             })
          }
        }

      } catch (error) {
        // Error retrieving data
      }

      this.getData(this.state.user,this.state.selectedYear,this.state.kybaocao);
   }

   async onChangeKyBaoCao(value: string) {
   await this.setState({
     kybaocao: value
   });

     this.getData(this.state.user,this.state.selectedYear,value);

 }


 async onValueChangeYear(value: string){
   await this.setState({
     selectedYear: value,
     kybaocao:  this.getKyHienTai(0),

   });

     this.getData(this.state.user,value,this.state.kybaocao);

 }

getKyHienTai(loaiky){

  switch (loaiky) {
    case 0 : {
      return  'NAM';
    }
    case 1 : {
      let d = new Date();
      let thang = d.getMonth()
        switch (thang) {
          case  0 :return 'THANG1';
          case  1 :return'THANG2';
          case  2 : return 'THANG3';
          case  3 : return 'THANG4';
          case  4 :return 'THANG5';
          case  5 :return 'THANG6';
          case  6 :return 'THANG7';
          case  7 :return 'THANG8';
          case  8 :return 'THANG9';
          case  9 : return 'THANG10';
          case  10 :return 'THANG11';
          default: return 'THANG12';
        }

    }
    case 2 : {
      let d = new Date();
      let thang = d.getMonth()
      if(thang < 3) return'QI';
      else if ( thang > 2 && thang < 6) return 'QII';
      else if( thang > 5 && thang < 9) return 'QIII';
      else if (thang > 8 && thang < 12) return 'QIV';
    }
     default:{
       let d = new Date();
       let thang = d.getMonth()
       if(thang < 6)
        return 'SAUTHANG_DAUNAM';
        else {
          return 'SAUTHANG_CUOINAM';
        }
     }

  }
}



getData = (user,nam,kybaocao) =>{
//console.log(user);
//alert(user + '-' +nam+ '-'+kybaocao );

 let url = 'http://'+this.state.server+'/HRMS/remoting/kpidata/kpicanhan/'+nam+'/'+kybaocao+'/';

 fetch( url, {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
 body: JSON.stringify({
 user: user
 }),
 })
 .then((response) => response.json())
 .then((responseJson) => {
   console.log(responseJson.kpi);
   this.setState({data: responseJson.kpi.chitieu,
                  xeploai:responseJson.kpi.xeploai,tongdiem:responseJson.kpi.tongdiem});
 })
 .catch((error) => {
   console.log(error);
 });
}


 renderBody(){

   const { loaiky,kybaocao,selectedYear } = this.state

   return(
     <Container >
       <Header hasSegment>
         <Left>
           <Button
             transparent
             onPress={() => this.props.navigation.navigate("DrawerOpen")}
           >
             <Icon name="menu" />
           </Button>
         </Left>
         <Body >
            <Segment>
             <Button first active={loaiky === 0 ? true : false} onPress={()=> this.onChangeLoaiKy(0)} >
               <Text>{selectedYear}</Text>
             </Button>
             <Button  active={loaiky === 1 ? true : false} onPress={()=> this.onChangeLoaiKy(1)}>
               <Text>TH</Text>
             </Button>
             <Button  active={loaiky === 2 ? true : false} onPress={()=> this.onChangeLoaiKy(2)}>
               <Text>Q</Text>
             </Button>
             <Button  active={loaiky === 3 ? true : false} onPress={()=> this.onChangeLoaiKy(3)}>
               <Text>BN</Text>
             </Button>
           </Segment>
         </Body>
         <Right/>
       </Header>
       <View style={{flexDirection: 'row'}}>
           <View style={{alignItems:'center',backgroundColor:'#6fb9f6',width:'50%'}}>
             {(() => {

                     switch (loaiky) {
                       case 0:   return (
                                 <Picker  mode="dropdown"  style={{width:'100%'}}
                                         selectedValue={selectedYear}  onValueChange={this.onValueChangeYear.bind(this)} >
                                              <Item label={(this.currentYear-1).toString()} value={(this.currentYear-1).toString()} />
                                              <Item label={this.currentYear.toString()} value={this.currentYear.toString()} />
                                              <Item label={(this.currentYear+1).toString()} value={(this.currentYear+1).toString()} />
                                 </Picker>
                                 );
                       case 1: return (
                         <Picker
                                       mode="dropdown" style={{width:'100%'}}
                                       selectedValue={kybaocao}
                                       onValueChange={this.onChangeKyBaoCao.bind(this)}
                                     >
                                       <Item label="Tháng 1" value="THANG1" />
                                       <Item label="Tháng 2" value="THANG2" />
                                       <Item label="Tháng 3" value="THANG3" />
                                       <Item label="Tháng 4" value="THANG4" />
                                       <Item label="Tháng 5" value="THANG5" />
                                       <Item label="Tháng 6" value="THANG6" />
                                       <Item label="Tháng 7" value="THANG7" />
                                       <Item label="Tháng 8" value="THANG8" />
                                       <Item label="Tháng 9" value="THANG9" />
                                       <Item label="Tháng 10" value="THANG10" />
                                       <Item label="Tháng 11" value="THANG11" />
                                       <Item label="Tháng 12" value="THANG12" />
                                     </Picker>


                                 );
                       case 2:  return (

                         <Picker  mode="dropdown"  style={{width:'100%'}}
                                 selectedValue={kybaocao}  onValueChange={this.onChangeKyBaoCao.bind(this)} >
                                       <Item label="Quý 1" value="QI" />
                                       <Item label="Quý 2" value="QII" />
                                       <Item label="Quý 3" value="QIII" />
                                       <Item label="Quý 4" value="QIV" />
                             </Picker>

                       );
                       default:      return (
                         <Picker  mode="dropdown"   style={{width:'100%'}}
                                 selectedValue={kybaocao}  onValueChange={this.onChangeKyBaoCao.bind(this)} >
                                       <Item label="6 Tháng đầu năm" value="SAUTHANG_DAUNAM" />
                                       <Item label="6 Tháng cuối năm" value="SAUTHANG_CUOINAM" />

                          </Picker>
                       );
                     }
             })()}

           </View>
           <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center',backgroundColor:'#57aef4',width:'35%'}}>
                <Label style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Điểm: </Label>
                <Label style={{color:'#ffa500',fontSize:22,fontWeight:'bold'}}>{this.state.tongdiem}</Label>
          </View>
          <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center',backgroundColor:'#3fa2f3',width:'15%'}}>
                <Label style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>XL: </Label>
               <Label style={{color:'#ffa500',fontSize:22,fontWeight:'bold'}}>{this.state.xeploai}</Label>
         </View>
          </View>
   <ScrollView >
     <BoxKpi data = {this.state.data} navigation={this.props.navigation}
       namBaoCao = {this.state.selectedYear}
       kyBaoCao = {this.state.kybaocao}
       getData = {this.getData}
     />
   </ScrollView>
   </Container>
   );
 }

    render() {
        return (
        <View style={styles.container} >
                { this.renderBody() }
        </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
      width: metrics.DEVICE_WIDTH,
      height: metrics.DEVICE_HEIGHT
    }
})

module.exports = DashboardCaNhan
