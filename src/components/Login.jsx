import React,{ useState} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';



const Login = () => {

  const [user,setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();


  const responseGoogle = (response) => {
    
    localStorage.setItem('user', JSON.stringify(response));
    const { name, id, picture } = response;

    const doc = {
      _id: id,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/',{replace: true})
      });

  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);

      if(codeResponse) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse?.access_token}`,{
          headers: {
            Authorization: `Bearer ${codeResponse?.access_token}`,
            Accept: 'application/json'
          }
        }).then((res) => {
          setProfile(res.data);
          responseGoogle(res.data);
        })
          .catch((error) => console.log('Error',error));
      };

    },
    onError: (error) => console.log('Login Failed:',error)
  });

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 backdrop-brightness-50'>
          <div className='p-5'>
            <img src={logo} width="130px" alt="logo"/>
          </div>

          <div className='shadow-2x1 cursor-pointer' onClick={() => login()}>
            <div className='flex items-center justify-center space-x-2 bg-white rounded-lg p-2'>
              <FcGoogle className=''/>
              <button className='mr-4' >Signin with Google</button>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  );
}

export default Login;
