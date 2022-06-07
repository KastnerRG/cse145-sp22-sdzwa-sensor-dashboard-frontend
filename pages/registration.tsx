import type { NextPage } from 'next'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faPaw } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from 'react-bootstrap'
import useWindowDimensions from '../components/useWindowDimensions'
import { register } from '../services/User'

const Registration: NextPage = () => {
    const router = useRouter();
    const { height, width } = useWindowDimensions();
    const [cookies, setCookie] = useCookies(['token']);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async (event: any) => {
        event?.preventDefault();
        const req = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        try {
            const registrationResponse = await register(req);
            const registrationResponseJson = await registrationResponse.json();
            if (registrationResponseJson.token) {
                setCookie('token', registrationResponseJson.token, { path: '/' });
                console.log('Successfully retrieved token');
                router.push('/');
            }
        } catch (e) {
            alert('Oops, something went wrong!');
            console.error(e);
        }
    };

    return (
        <div className={styles.container} id="registration-home">
            <Head>
              <title>Registration Page</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">SDZWA Sensor Dashboard</Navbar.Brand>
                    <Button variant="outline-primary" href="login">Login</Button>
                </Container>
            </Navbar>
            <Container style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '90vh'}} id="reg-form-container">
                <h1 style={{flex: 1, marginTop: width > 600 ? '15%' : '35%', textAlign: 'center'}}>Welcome to the SDZWA Sensor Dashboard <FontAwesomeIcon icon={faPaw}/></h1>
                <Form style={{width: width > 600 ? '50%' : '70%', flex: 1, marginTop: '5%', marginBottom: width > 600 ? '80%' : '100%'}}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Control type="text" placeholder="First name" value={firstName} onChange={({target:{value}}) => {setFirstName(value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Control type="text" placeholder="Last name" value={lastName} onChange={({target:{value}}) => {setLastName(value)}}/>
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="email-addon">
                            <FontAwesomeIcon icon={faEnvelope} style={{color: 'royalblue'}}/>
                        </InputGroup.Text>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={({target:{value}}) => {setEmail(value)}}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="pass-addon">
                            <FontAwesomeIcon icon={faLock} style={{color: 'royalblue'}}/>
                        </InputGroup.Text>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={({target:{value}}) => {setPassword(value)}}/>
                    </InputGroup>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
                        <Button onClick={signUp} variant="primary" type="submit" href=".." style={{flex: 1, marginLeft: '20%', marginRight: '20%', alignItems: 'center', flexDirection: 'row', width: '100%', alignSelf: 'center'}}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Registration