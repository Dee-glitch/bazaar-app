import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import GoogleButton from 'react-google-button';

const GoogleSignIn = () => {
  const { dispatch } = useContext(AuthContext);
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const history = useHistory();
  async function responseGoogle(response) {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/users/googleLogin`,
      data: {
        accessToken: response.accessToken,
        userID: response.Zb.id_token,
        email: response.profileObj.email,
      },
    });

    function loginCall(userCredential, dispatch) {
      dispatch({ type: 'LOGIN_START' });
      try {
        dispatch({ type: `LOGIN_SUCCESS`, payload: res.data });
        history.push('/');
      } catch (err) {
        dispatch({ type: `LOGIN_FAILURE`, payload: err.response.data });
      }
    }
    loginCall({ email: res.data.email, password: res.data.password }, dispatch);
  }
  return (
    <Card style={{ width: '350px' }}>
      <Card.Header style={{ margin: '0 auto' }}>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <GoogleButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              label="LOGIN WITH GOOGLE"
              style={{ width: '310px', paddingLeft: '30px' }}
            />
          )}
        />
      </Card.Header>
    </Card>
  );
};

export default GoogleSignIn;
