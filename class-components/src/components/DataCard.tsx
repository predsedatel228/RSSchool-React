// eslint-disable-next-line react-compiler/react-compiler
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { ISavedData } from "../types";

const DataCard = (props: {data : ISavedData, isNew: boolean} ) => {
  const {data, isNew} = props;
  const [className, setClassName] = useState('form-item');
  const classNameHandler = () => {
    if (isNew) {
      setClassName('form-item form-item_new');
      setTimeout(() => {
        setClassName('form-item')
      }, 3000);
    }
  }
  useEffect(() => classNameHandler(), [])
  return(<div className={className}>
    <img src={data.image} alt="image" className='form-item_image'/>
      <div>{`Name: ${data.name}`}</div>
      <div>{`Age: ${data.age}`}</div>
      <div>{`Country: ${data.country}`}</div>
      <div>{`Gender: ${data.gender}`}</div>
      <div>{`Email: ${data.email}`}</div>
      <div>{`Password: ${data.password}`}</div>
  </div>)
}

export default DataCard;