import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { backend } from 'declarations/backend';

type Topic = {
  id: bigint;
  categoryId: bigint;
  title: string;
  content: string | null;
  createdAt: bigint;
};

function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      if (id) {
        try {
          const result = await backend.getTopics(BigInt(id));
          setTopics(result);
          const categories = await backend.getCategories();
          const category = categories.find(c => c.id.toString() === id);
          if (category) {
            setCategoryName(category.name);
          }
        } catch (error) {
          console.error('Error fetching topics:', error);
        }
      }
    };
    fetchTopics();
  }, [id]);

  return (
    <div>
      <Typography variant="h4" component="h1" className="mb-4 text-indigo-800">
        {categoryName}
      </Typography>
      <Button
        component={Link}
        to={`/create-topic?categoryId=${id}`}
        variant="contained"
        color="primary"
        className="mb-4"
        startIcon={<AddCircleOutline />}
      >
        Create New Topic
      </Button>
      <Paper elevation={3} className="p-4">
        <List>
          {topics.map((topic) => (
            <React.Fragment key={topic.id.toString()}>
              <ListItem
                component={Link}
                to={`/topic/${topic.id}`}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <ListItemText
                  primary={<Typography variant="h6" className="text-indigo-700">{topic.title}</Typography>}
                  secondary={`Created at: ${new Date(Number(topic.createdAt) / 1000000).toLocaleString()}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default CategoryPage;
