import { useForm } from "react-hook-form";
import {loginUser} from '../../api/user';
import { useState, useEffect } from "react";
import { storageSave } from "../../utils/storage";
import { useNavigate } from 'react-router-dom'
import { useUser } from "../../context/UserContext";
import { STORAGE_KEY_USER } from "../../const/storageKeys";

const usernameConfig = {
  required: true,
  minLength: 3,
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user, setUser} = useUser()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if(user !== null){
      navigate('translation')
    }
  }, [user, navigate])

  const onSubmit = async ({username}) => {
    setLoading(true)
    const [error, userResponse] = await loginUser(username)
    if(error !== null){
      setApiError(error)
    }
    if(userResponse !== null){
      storageSave(STORAGE_KEY_USER, userResponse)
      setUser(userResponse)
    }
    setLoading(false)
  };

  const errorMessage = (() => {
    if (!errors.username) {
      return null;
    }

    if (errors.username.type === "required") {
      return <span> Username is required</span>;
    }

    if (errors.username.type === "minLength") {
      return <span> Username is too short</span>;
    }
  })();

  return (
    <>
      <header>
        <img src="img/welcome.png" alt="welcome"/>
      </header>

      <div className="box">
        <h2> What's is your name?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter your username"
              className="email"
              {...register("username", usernameConfig)}
            />
            {errorMessage}
          <button className="btn" type="submit" disabled={loading}>Continue</button>

          {loading && <p className="loading">Logging in...</p>}
          {apiError && <p>{apiError}</p>}
        </form>
      </div>
    </>
    
  );
};

export default Login;
