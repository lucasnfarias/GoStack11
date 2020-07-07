import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories')
    .then(response => setRepos(response.data))
    .catch(err => console.log(err));
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Projeto Teste",
      owner: "Lucas Niehues de Farias"
    });

    setRepos([...repos, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepos = repos.filter(repo => repo.id !== id);

    setRepos(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
