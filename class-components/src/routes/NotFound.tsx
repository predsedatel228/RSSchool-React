import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Page not found</h1>
      <button onClick={() => navigate('/')}>Go to main</button>
    </div>
  )
}

export default NotFound;