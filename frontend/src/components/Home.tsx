import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { ChatBubbleOutline, CodeOutlined, SportsBasketballOutlined } from '@mui/icons-material';
import { backend } from 'declarations/backend';

type Category = {
  id: bigint;
  name: string;
  description: string;
};

const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'General Discussion':
      return <ChatBubbleOutline className="category-icon" />;
    case 'Technology':
      return <CodeOutlined className="category-icon" />;
    case 'Sports':
      return <SportsBasketballOutlined className="category-icon" />;
    default:
      return <ChatBubbleOutline className="category-icon" />;
  }
};

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await backend.getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <Typography variant="h2" component="h1" className="text-center mb-8 text-indigo-800">
        Welcome to IC Forum
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id.toString()}>
            <Card component={Link} to={`/category/${category.id}`} className="category-card h-full no-underline">
              <CardContent className="flex flex-col items-center text-center">
                {getCategoryIcon(category.name)}
                <Typography variant="h5" component="h2" className="mb-2 text-indigo-700">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
