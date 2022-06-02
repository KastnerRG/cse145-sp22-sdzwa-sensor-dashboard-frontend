import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Area from '../components/Area'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import { getAllSensors } from '../services/Sensor';
import { fetchUtils } from 'react-admin'


const Home: NextPage = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  const [sensors, setSensors] = useState([]);

  const getStatusStyle = (status: number) => {
    switch (status) {
      case 1: return 'success';
      case 2: return 'warning';
      case 3: return 'danger';
    }
  }

  const getStatusMessage = (status: number) => {
    switch (status) {
      case 1: return 'Online';
      case 2: return 'Partially Functional';
      case 3: return 'Offline';
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!cookies.token || cookies.token == '') {
        router.push('/registration');
      } else {
        try {
          const sensorResponse = await getAllSensors(cookies.token);
          const sensorResponseJson = await sensorResponse.json();
          console.log(sensorResponseJson);
          setSensors(sensorResponseJson);
        } catch (e) {
          alert('Oops, something went wrong!');
          console.error(e);
        }
      }
    }
    fetchData();
  }, [router, cookies]);

  const signOut = () => {
    setCookie('token', '');
    router.push('/login');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SDZWA Sensor Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">SDZWA Sensor Dashboard</Navbar.Brand>
          <Button onClick={signOut} variant="outline-primary" href="login">Sign Out</Button>
        </Container>
      </Navbar>
      <Container>
        <Row>
          {sensors.map((sensor: any, key: number) => (
            <Col onClick={() => {router.push(`/sensor?id=${sensor.id}`)}} style={{cursor: 'pointer', marginTop: 50}} key={key}>
              <Area width={400} height={300} />
              <div style={{ fontWeight: 'bold', fontSize: 26 }}>{sensor.name}</div>
              <div style={{ fontSize: 22, fontWeight: 'lighter' }}>{sensor.description}</div>
              <div style={{ fontSize: 20 }}>Status:{' '}
                <Button variant={getStatusStyle(sensor.status)} size="sm" disabled>
                  {getStatusMessage(sensor.status)}
                </Button>{' '}
              </div>
            </Col>
          ))}
          <Col>
            <div onClick={() => {router.push('/edit_sensor?id=0')}} style={{ cursor: 'pointer', paddingTop: 100, marginTop: 50, marginBottom: 50, height: 300, width: 400, backgroundColor: '#E6EBEE', borderRadius: 15 }}>
              <div style={{ textAlign: 'center', color: 'gray' }}><h2>Add New</h2></div>
              <div style={{ textAlign: 'center', marginTop: -25, fontWeight: 'bold', fontSize: 64, color: 'gray'}}>
                +
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
