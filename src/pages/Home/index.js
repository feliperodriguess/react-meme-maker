import React, { useState, useEffect } from 'react';
import qs from 'qs';

import { Container, Card, Templates, Form, Button } from './styles';

import logo from '../../assets/logo.svg'

function Home() {
  const [ templates, setTemplates ] = useState([]);
  const [ selectedTemplate, setSelectedTemplate ] = useState(null);
  const [ boxes, setBoxes ] = useState([]);
  const [ generatedMeme, setGeneratedMeme ] = useState(null);

  useEffect( () => {

    (async () => {
      const memeResponse = await fetch('https://api.imgflip.com/get_memes');
      const { data: { memes } } = await memeResponse.json();
      setTemplates(memes);
    })();

  }, []);

  //Currying -> function which returns another function
  const handleInputChange = (index) => (e) => {
    const newValues = boxes;
    newValues[index] = e.target.value;
    setBoxes(newValues);
  }

  function handleSelectedTemplate(template) {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const memeParams = qs.stringify({
      template_id: selectedTemplate.id,
      username: 'felpss',
      password: 'KAKAKA',
      boxes: boxes.map (text => ({text})),
    });

    const memeReadyResponse = await fetch(`https://api.imgflip.com/caption_image?${memeParams}`);
    const { data: { url } } = await memeReadyResponse.json();
    setGeneratedMeme(url);
  }

  function handleReset() {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }

  return (
    <Container>
      <img src={logo} alt="Meme Maker" />

      <Card>
        {generatedMeme && (
          <>
            <img src={generatedMeme} alt="Generated Meme" />
            <Button type="button" onClick={handleReset}>Criar outro meme</Button>
          </>
        )}

        {!generatedMeme && (
          <>
            <h2>Selecione um template</h2>
            <Templates>
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelectedTemplate(template)}
                className={template.id === selectedTemplate?.id ? 'selected' : ''}
                >

                <img src={template.url} alt={template.name}/>
              </button>
            ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Textos</h2>

                <Form onSubmit={handleSubmit} >
                  {(new Array(selectedTemplate.box_count)).fill('').map((_, index) => (
                    <input
                      key={String(Math.random())}
                      placeholder={`Text #${index + 1}`}
                      onChange={handleInputChange(index)}
                    />
                  ))}

                  <Button type="submit">Criar Meme</Button>
                </Form>
             </>
            )}
         </>
        )}
      </Card>

    </Container>
  )
}

export default Home;
