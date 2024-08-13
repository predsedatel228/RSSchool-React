import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="forms-container">
      <Link to="/form">Uncontolled form</Link>
      <Link to="/react-hook-form">React hook form</Link>
    </div>
  )
}

export default Main;