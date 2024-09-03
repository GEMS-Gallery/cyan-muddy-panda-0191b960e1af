import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import TopicPage from './components/TopicPage';
import CreateTopic from './components/CreateTopic';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initBackend = async () => {
      try {
        await backend.init();
        setLoading(false);
      } catch (error) {
        console.error('Error initializing backend:', error);
        setLoading(false);
      }
    };
    initBackend();
  }, []);

  if (loading) {
    return (
      <Container className="flex items-center justify-center h-screen">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" className="text-white no-underline">
            IC Forum
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/create-topic" element={<CreateTopic />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
