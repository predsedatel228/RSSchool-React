import { ISavedData } from "../types";

const DataCard = (props: {data : ISavedData} ) => {
  const {data} = props;
  return(<div className="form-item">
    <img src={data.image} alt="image" className="form-item_image"/>
      <div>{`Name: ${data.name}`}</div>
      <div>{`Age: ${data.age}`}</div>
      <div>{`Country: ${data.country}`}</div>
      <div>{`Gender: ${data.gender}`}</div>
      <div>{`Email: ${data.email}`}</div>
      <div>{`Password: ${data.password}`}</div>
  </div>)
}

export default DataCard;