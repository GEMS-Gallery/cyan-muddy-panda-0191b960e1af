import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

function CreateTopic() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('categoryId');

  useEffect(() => {
    if (!categoryId) {
      navigate('/');
    }
  }, [categoryId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryId) {
      setLoading(true);
      try {
        const result = await backend.createTopic(BigInt(categoryId), title, content);
        if ('ok' in result) {
          navigate(`/topic/${result.ok}`);
        } else {
          console.error('Error creating topic:', result.err);
        }
      } catch (error) {
        console.error('Error creating topic:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" className="mb-4">
        Create New Topic
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Topic'}
        </Button>
      </form>
    </div>
  );
}

export default CreateTopic;
