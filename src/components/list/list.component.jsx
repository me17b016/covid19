import React, { useState, useEffect } from 'react'
import './list.styles.css'

const List = ({ selectedDistricts, deleteDistrict }) => {


  return (
    <div>
      {
        Object.entries(selectedDistricts).map(([key, value], index) => 
          <div key={index} className={`list-card list-card-${value.zone}`} onClick={() => deleteDistrict(value.districtUniqueKey)}> 
            <div className="list-card-district">{value.district}</div> 
            <div className="list-card-extra">
              <div className="list-card-state">{"State : " + value.state}</div> 
              <div className="list-card-zone">{value.zone + " Zone"}</div>
            </div>
          </div>)
      }
    </div>
  )
}

export default List