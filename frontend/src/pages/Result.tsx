import MatchDetails from '../components/Matchup/MatchDetails';
import MatchScore from '../components/Matchup/MatchScore';
import MatchScorers from '../components/Matchup/MatchScorers';
import MatchComments from '../components/Matchup/Comments/MatchComments';
import { useNavigate } from 'react-router-dom';
import { Group, Loader, useMantineTheme } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { GET_RESULT } from '../graphql/resultOperations';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Result() {
  const navigate = useNavigate();
  const { resultId } = useParams<{ resultId: string }>();
  const theme = useMantineTheme();
  const { loading, error, data } = useQuery(GET_RESULT, {
    variables: { id: resultId },
  });

  const result = data?.result;

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      navigate('/project2/not-found');
    }
  }, [error, navigate]);

  return (
    <Layout>
      {loading ? (
        <Loader size={30} color={theme.colors.primary[9]} />
      ) : (
        <Group gap={10}>
          <MatchDetails {...result} />
          <MatchScore {...result} />
          <MatchScorers result={result} />
          <MatchComments result={result} />
        </Group>
      )}
    </Layout>
  );
}
