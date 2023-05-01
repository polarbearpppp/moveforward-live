import { useState, useEffect, useContext} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;

export const useLogin = () => {
    const [error, setError] = useState(false); 

    const [values, setValues] = useState({
        email: '',
        password: '',
      });
    const navigate = useHistory();
    const {dispatch} = useContext(AuthContext)
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };
    
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        dispatch({type:"LOGIN",payload: user})
        navigate.push('/overview')
    // ...
    })
    .catch((error) => {
        setError(true);
    });
    }

    return {handleChange,handleLogin,values, error};
};
