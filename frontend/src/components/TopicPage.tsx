import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';
import { backend } from 'declarations/backend';

type Topic = {
  id: bigint;
  categoryId: bigint;
  title: string;
  content: string | null;
  createdAt: bigint;
};

function TopicPage() {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      if (id) {
        try {
          const result = await backend.getTopic(BigInt(id));
          if (result.length > 0) {
            setTopic(result[0]);
          }
        } catch (error) {
          console.error('Error fetching topic:', error);
        }
      }
    };
    fetchTopic();
  }, [id]);

  if (!topic) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" className="mb-4">
        {topic.title}
      </Typography>
      <Paper className="p-4 mb-4">
        <Typography variant="body1">
          {topic.content || 'No content available.'}
        </Typography>
      </Paper>
      <Typography variant="caption" className="text-gray-600">
        Created at: {new Date(Number(topic.createdAt) / 1000000).toLocaleString()}
      </Typography>
    </div>
  );
}

export default TopicPage;
