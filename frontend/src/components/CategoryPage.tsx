import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
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
      <Typography variant="h4" component="h1" className="mb-4">
        {categoryName}
      </Typography>
      <Button
        component={Link}
        to={`/create-topic?categoryId=${id}`}
        variant="contained"
        color="primary"
        className="mb-4"
      >
        Create New Topic
      </Button>
      <List>
        {topics.map((topic) => (
          <React.Fragment key={topic.id.toString()}>
            <ListItem
              component={Link}
              to={`/topic/${topic.id}`}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <ListItemText
                primary={topic.title}
                secondary={`Created at: ${new Date(Number(topic.createdAt) / 1000000).toLocaleString()}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default CategoryPage;
