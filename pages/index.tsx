import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Area from '../components/Area'
import Link from 'next/link';

const Home: NextPage = () => {
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
          <Button variant="outline-primary">Sign Out</Button>
        </Container>
      </Navbar>
      <Container>
        <div style={{marginTop: 25}}>
          <Area width={400} height={300} />
        </div>
      </Container>
    </div>
  )
}

export default Home
