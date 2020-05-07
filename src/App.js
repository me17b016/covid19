import React, { Component } from 'react'
import './App.css'

import Covid19 from './assests/covid19.png'
import SearchBox from './components/searchbox/searchbox.component'
import List from './components/list/list.component'

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districts : ['Agra', 'Allahabad', 'Manipur', 'Tirupati', 'Bombay'],
      districtsData : {},
      selectedDistricts : [],
      input : ""
    }
  }

  async componentDidMount () {
    const response = await axios.get('https://api.covid19india.org/zones.json');
    const data = response.data
    const allDistricts = data.zones
    let districts = [], districtsData = []
    for (let i = 0; i < allDistricts.length; i++) {
      districts.push(allDistricts[i].district)
      let districtUniqueKey = allDistricts[i].district //+ allDistricts[i].statecode
      let dataObject = {
        district : allDistricts[i].district,
        state : allDistricts[i].state,
        statecode : allDistricts[i].statecode,
        zone : allDistricts[i].zone,
        districtUniqueKey : districtUniqueKey
      }
      districtsData = {...districtsData, [districtUniqueKey] : dataObject}
    }
    this.setState(() => ({ districts, districtsData }))
  }

  districtSelected = (name) => {
    this.setState({
      selectedDistricts : {[name] : this.state.districtsData[name], ...this.state.selectedDistricts}
    })
  } 

  deleteDistrict = (name) => {
    let selectedDistricts = {...this.state.selectedDistricts}
    delete selectedDistricts[name]
    this.setState(() => ({ selectedDistricts }))
  }

  clearAll = () => {
    this.setState(() => ({ selectedDistricts : {} }))
  }

  render() {
    return (
      <div className="App">
        <div className="App-topbar">
          <div className="App-covid19"><img className="App-covid19" src={Covid19} alt="Covid19" height="99px"/></div>
          <div className="App-searchbox">
            <SearchBox 
              districts={this.state.districts} 
              districtSelected={this.districtSelected}
              clearAll={this.clearAll}/>
            {/* <ClearAll clearAll={this.clearAll}/> */}
          </div>
        </div>
        <List 
          selectedDistricts={this.state.selectedDistricts} 
          deleteDistrict={this.deleteDistrict}/>
      </div>
    );
  }
}

export default App;
