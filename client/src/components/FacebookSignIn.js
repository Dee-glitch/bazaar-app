import React, { useContext } from 'react';
import axios from 'axios';
import { FaFacebookF } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { AuthContext } from '../context/AuthContext';

function FacebookSignIn() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  async function responseFacebook(response) {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/users/facebookLogin`,
      data: {
        accessToken: response.accessToken,
        userID: response.userID,
        picture: response.picture.data.url,
      },
    });

    function facebookLoginCall(userCredential, dispatch) {
      dispatch({ type: 'LOGIN_START' });
      try {
        dispatch({ type: `LOGIN_SUCCESS`, payload: res.data });
        history.push('/');
      } catch (err) {
        dispatch({ type: `LOGIN_FAILURE`, payload: err.response.data });
      }
    }
    facebookLoginCall({ email: res.data.email, password: res.data.password }, dispatch);
  }

  return (
    <Card style={{ width: '350px', margin: '0 auto' }}>
      <Card.Header style={{ width: '350px' }}>
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          autoLoad={false}
          buttonStyle={{ width: '310px', fontSize: '14px', padding: '3px 0px' }}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={responseFacebook}
          icon={
            <FaFacebookF
              style={{
                fontSize: '45px',
                color: '#4c69ba',
                background: 'white',
                padding: '10px 1px',
                marginRight: '30px',
              }}
            />
          }
        />
      </Card.Header>
    </Card>
  );
}

export default FacebookSignIn;
