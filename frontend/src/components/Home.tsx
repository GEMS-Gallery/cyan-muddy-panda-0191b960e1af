import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { backend } from 'declarations/backend';

type Category = {
  id: bigint;
  name: string;
  description: string;
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
      <div className="header-bg h-64 flex items-center justify-center mb-8">
        <Typography variant="h2" component="h1" className="text-white text-shadow">
          Welcome to IC Forum
        </Typography>
      </div>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id.toString()}>
            <Card component={Link} to={`/category/${category.id}`} className="h-full hover:shadow-lg transition-shadow duration-300 no-underline">
              <CardContent>
                <Typography variant="h5" component="h2" className="mb-2">
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
