import React, {Component} from 'react';
import {StyleSheet,View,Button,TouchableOpacity} from 'react-native';
import {Text } from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from './../config/metrics'



export default class BoxKpi extends Component {
  constructor(props){
    super(props)

}

static propTypes = {
    getData: PropTypes.func.isRequired,
  }


    render() {
        const { navigate } = this.props.navigation;
        const { getData } = this.props
        let namBaoCao = this.props.namBaoCao;
        let kyBaoCao = this.props.kyBaoCao;

        let articles = this.props.data.map(function (articleData) {
                return (
                  <View style={articleData.hoatdong === 'false' ? styles.boxHide : styles.box} key={articleData.ma} >
                    <TouchableOpacity onPress={()=> {
                      navigate('KriCtGiao',{
                        'namBaoCao': namBaoCao,
                        'kyBaoCao': kyBaoCao,
                        'yeuto': articleData.yeuto,
                        'idChiTieuGiao': articleData.id,
                        'tenChiTieu': articleData.ten,
                        'isBaoCao' : articleData.ttbaocao,
                        'kqThucHien' : articleData.thuchien,
                        'getData':getData
                      })
                    }}>
                        <Text style={{fontSize:22,fontWeight:'bold' ,color: '#33cc33',textAlign:'right'}}>
                            {articleData.diem}
                        </Text>
                        <Text style={{paddingBottom:5,fontSize:16 ,color: '#0066cc',textAlign:'left'}}>
                          {articleData.ten}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize:16 ,color: '#222222',textAlign:'left'}}>
                            Đơn vị tính:
                          </Text>
                          <Text style={{fontSize:16,fontWeight:'bold', color: '#ff9933',textAlign:'left'}}>
                            {articleData.donvitinh}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize:16 ,color: '#222222',textAlign:'left'}}>
                            Mục tiêu:
                          </Text>
                          <Text style={{fontSize:16,fontWeight:'bold', color: '#ff9933',textAlign:'left'}}>
                            {articleData.giao}
                          </Text>

                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize:16 ,color: '#222222',textAlign:'left'}}>
                            Thực hiện:
                          </Text>
                          <Text style={{fontSize:16,fontWeight:'bold', color: '#ff9933',textAlign:'left'}}>
                            {articleData.thuchien}
                          </Text>
                        </View>


                         {(() => {
                          if(articleData.ttbaocao === 'false')
                          return (
                            <Text style={{paddingBottom:5,fontSize:16 ,fontWeight:'bold',color: 'red',textAlign:'left'}}>
                            Chưa báo cáo
                            </Text>
                            );
                         })()}
                        </TouchableOpacity>
                  </View>

                )
            });

        return (

          <View style={styles.container}>
                {articles}
          </View>

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
  },
  boxHide:{
    display:'none'
  }

});


module.exports = BoxKpi;
