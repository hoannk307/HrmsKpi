import React, {Component} from 'react';
import {Text,StyleSheet,View,Button,TouchableOpacity,ScrollView} from 'react-native';

import {ScrollableTab,Tab,Tabs,Content,Body,Card,CardItem} from "native-base";

import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from './../config/metrics'



export default class BoxBsc extends Component {
  constructor(props){
    super(props)
    this.state = { initialPage: 1, activeTab: 1 }
}

    render() {
        const { navigate } = this.props.navigation;
        let articles = this.props.data.map(function (bsc) {
                return (
                        <Tab heading={bsc.viencanh}>
                          <ScrollView>
                              {
                              bsc.chitieu.map(function(ct){
                              return(
                                <View style={styles.box} key={ct.ma} >
                                  <TouchableOpacity onPress={()=> {
                                    navigate('BscCtGiao',{
                                      'yeuto': ct.yeuto,
                                      'idChiTieuGiao': ct.id,
                                      'tenChiTieu': ct.ten,
                                      'isBaoCao' : ct.ttbaocao,
                                      'kqThucHien' : ct.thuchien
                                    })
                                  }}>
                                <Text style={{fontSize:22,fontWeight:'bold' ,color: '#33cc33',textAlign:'right'}}>
                                    {ct.diem}
                                </Text>
                                <Text style={{paddingBottom:5,fontSize:16 ,color: '#0066cc',textAlign:'left'}}>
                                  {ct.ten}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                  <Text style={{fontSize:16 ,color: '#222222',textAlign:'left'}}>
                                    Đơn vị tính:
                                  </Text>
                                  <Text style={{fontSize:16,fontWeight:'bold', color: '#ff9933',textAlign:'left'}}>
                                    {ct.donvitinh}
                                  </Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Text style={{fontSize:16 ,color: '#222222',textAlign:'left'}}>
                                    Mục tiêu:
                                  </Text>
                                  <Text style={{fontSize:16,fontWeight:'bold', color: '#ff9933',textAlign:'left'}}>
                                    {ct.giao}
                                  </Text>

                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Text style={{fontSize:16 ,color: '#222222',textAlign:'left'}}>
                                    Thực hiện:
                                  </Text>
                                  <Text style={{fontSize:16,fontWeight:'bold', color: '#ff9933',textAlign:'left'}}>
                                    {ct.thuchien}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              </View>
                              )
                            }
                          )
                        }
                        </ScrollView>
                        </Tab>



                )
            });

        return (
            <Tabs renderTabBar={() => <ScrollableTab />} style={{width:'100%',backgroundColor:'#fff'}}>
             {articles}
            </Tabs>


        );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 5,
    //backgroundColor:'#7DCDFF',
     justifyContent:'center'
  },
  box: {
    padding : 10,
    flexBasis: metrics.DEVICE_WIDTH-10,
    borderBottomWidth: 1,
    borderColor: '#c9c9c9',
    flex: 1,
    backgroundColor:'#fff',
  }
});


module.exports = BoxBsc;
