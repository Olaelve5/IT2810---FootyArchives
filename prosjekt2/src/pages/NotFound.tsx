import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
      <div>
        <h1>Red Card!</h1>
        <p>This page has been sent off—let's get you back on track.</p>
        <Link to="/project2">
          <Button color="primary">Go to the home page</Button>
        </Link>
      </div>
    );
  }
  
