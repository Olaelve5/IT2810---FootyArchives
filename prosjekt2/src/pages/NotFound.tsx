import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/language-store';

export default function NotFound() {
  const language = useLanguageStore((state) => state.language);
  return (
    <div>
      <h1>{language === 'en' ? 'Red card!' : 'Rødt kort!'}</h1>
      <p>
        {language === 'en'
          ? "This page has been sent off—let's get you back on track."
          : 'Denne siden har blitt sendt av banen—la oss få deg tilbake på sporet.'}
      </p>
      <Link to="/project2">
        {/* <Button color="primary">Go to the home page</Button> */}
        <Button radius={100} color="primary">{language === 'en' ? 'Go back to the home page' : 'Gå tilbake til startsiden'}</Button>
      </Link>
    </div>
  );
}
