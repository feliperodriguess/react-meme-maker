import React from 'react';

import { Container, Card, Templates, Form, Button } from './styles';

import logo from '../../assets/logo.svg'

function Home() {
  return (
    <Container>
      <img src={logo} alt="Meme Maker" />

      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          <button type="button">
            <img src="" alt="Template 1"/>
          </button>
          <button type="button">
            <img src="" alt="Template 1"/>
          </button>
          <button type="button">
            <img src="" alt="Template 1"/>
          </button>
          <button type="button">
            <img src="" alt="Template 1"/>
          </button>
        </Templates>

        <h2>Textos</h2>

        <Form>
          <input placeholder="Texto #1"/>
          <input placeholder="Texto #1"/>
          <input placeholder="Texto #1"/>

          <Button type="submit">MakeMyMeme!</Button>
        </Form>
      </Card>

    </Container>
  )
}

export default Home;
