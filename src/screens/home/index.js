import React, { Component } from "react";
import {AsyncStorage} from 'react-native'
import DashboardCaNhan from './../dashboard/dashboardCaNhan';
import DashboardLanhDaoDonVi from './../dashboard/dashboardLanhDaoDonVi';
import DashboardLanhDaoBoPhan from './../dashboard/dashboardLanhDaoBoPhan';
//import Demo from './../dashboard/Demo';

class Home extends Component {

  constructor(props){
    super(props);
    const { params } = props.navigation.state;
    this.user = params ? params.user : null;
    this.chucdanh = '';
    if(this.user !== null){
    this.json = JSON.parse(this.user);
    this.chucdanh = this.json.chucdanh;
  }
  }

  
   render() {
    //let json = JSON.parse(this.user);

    switch (this.chucdanh) {
      case 'CHUYENVIEN':   return (
          <DashboardCaNhan navigation={this.props.navigation} />
      );

      case 'GIAMDOC': return (
          <DashboardLanhDaoDonVi navigation={this.props.navigation} />
          );

          case 'PGIAMDOC': return (
              <DashboardLanhDaoDonVi navigation={this.props.navigation} />
              );

      case 'TRUONGBOPHAN': return (
              <DashboardLanhDaoBoPhan navigation={this.props.navigation} />
              );

      case 'PTRUONGBOPHAN': return (
                      <DashboardLanhDaoBoPhan navigation={this.props.navigation} />
                      );

      break;

  }

}

}

export default Home;
