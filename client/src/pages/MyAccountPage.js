import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AdminPanel from '../components/AdminPanel';
import Orders from '../components/Orders';
import Favorites from '../components/Favorites';
import MyProducts from '../components/MyProducts';
import Profile from '../components/Profile';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Alert } from 'react-bootstrap';
import { GrUserAdmin } from 'react-icons/gr';
import { FiRefreshCcw } from 'react-icons/fi';
import LoadingImage from '../images/Loading.gif';

const styles = [
  {
    height: '25px',
    width: '25px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    display: 'inline-block',
    textAlign: 'center',
    marginLeft: '0.5rem',
  },
  {
    maxHeight: '30rem',
    overflow: 'auto',
    background: '#fff',
  },
];

const MyAccountPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const { user } = useContext(AuthContext);
  const [userFromDB, setUserFromDB] = useState({});
  const [toggle, setToggle] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [toggle]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user._id}`);
      setUserFromDB(response.data);
      setIsLoaded(true);
      setErr(false);
    } catch (error) {
      console.log(error);
      setIsLoaded(false);
      setErr(true);
    }
  };

  if (!isLoaded && !err) {
    return (
      <img src={LoadingImage} style={{ margin: '0 auto', display: 'block', height: '65vh' }} />
    );
  }

  return (
    <>
      <style type="text/css">
        {`
.nav-link {
  color: var(--color-grey);
    cursor: default;
}
.nav-link.active {
    font-weight:bold;
}
.nav-link:hover {
  color: var(--color-grey);
  }
.btn-outline-success span {
    max-width: 0;
    -webkit-transition: max-width 1s;
    transition: max-width 1s;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
  }
.btn-outline-success:hover span {
    max-width: 7rem;
  }
    `}
      </style>
      {isLoaded && !err ? (
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>My Account</h1>
            <Button
              variant="outline-success"
              style={{ borderRadius: '2.5em' }}
              onClick={() => setToggle((toggle) => !toggle)}
            >
              <FiRefreshCcw /> <span> Refresh Content </span>
            </Button>
          </div>
          <Tabs justify defaultActiveKey="products" transition={false}>
            <Tab
              eventKey="Orders"
              style={styles[1]}
              title={
                <React.Fragment>
                  Orders
                  <span style={styles[0]}>{userFromDB.orders.length}</span>
                </React.Fragment>
              }
            >
              <Orders orders={isLoaded ? userFromDB.orders : <></>} />
            </Tab>
            <Tab
              eventKey="notification"
              style={styles[1]}
              title={
                <React.Fragment>
                  Notifications
                  <span style={styles[0]}>4</span>
                </React.Fragment>
              }
            >
              <></>
            </Tab>
            <Tab
              eventKey="favorites"
              style={styles[1]}
              title={
                <React.Fragment>
                  Favorites
                  <span style={styles[0]}>{userFromDB.favorites.length}</span>
                </React.Fragment>
              }
            >
              <Favorites />
            </Tab>
            <Tab
              eventKey="myProducts"
              style={styles[1]}
              title={
                <React.Fragment>
                  My Products
                  <span style={styles[0]}>{userFromDB.products.length}</span>
                </React.Fragment>
              }
            >
              <MyProducts />
            </Tab>
            {user.expert ? (
              <Tab
                eventKey="admin"
                style={styles[1]}
                title={
                  <React.Fragment>
                    <GrUserAdmin style={{ marginLeft: '6px' }} /> Admin Panel
                  </React.Fragment>
                }
              >
                <AdminPanel />
              </Tab>
            ) : (
              <></>
            )}
          </Tabs>
          <hr />
          <Profile user={isLoaded ? userFromDB : <></>} />
        </Container>
      ) : (
        <Container>
          <Alert variant="danger">You are logged out. Please log in.</Alert>
        </Container>
      )}
    </>
  );
};

export default MyAccountPage;
