import { Loader, TextInput } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { GET_USER_BY_ID } from '../../../graphql/userOperations';
import { getUserId } from '../../../utils/localStorageUtils';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

interface UsernameInputProps {
  username: string;
  setUsername: (username: string) => void;
  buttonPressed: boolean;
  setButtonPressed: (buttonPressed: boolean) => void;
  setUserIdState: (userId: string) => void;
}

function UsernameInput({ username, setUsername, buttonPressed, setButtonPressed, setUserIdState }: UsernameInputProps) {
  const { language } = useLanguageStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const getColor = () => {
    return isDark ? theme.colors.darkmode[2] : 'white';
  };

  // Fetch the user by id to get the username
  const [fetchUserById, { data, loading, error }] = useLazyQuery(GET_USER_BY_ID);

  // Fetch the user by id when the component mounts
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      fetchUserById({ variables: { _id: userId } });
    }
  }, [fetchUserById]);

  // Set the username if the user is fetched
  useEffect(() => {
    if (data && data.getUserById.username) {
      setUsername(data.getUserById.username);
      setUserIdState(data.getUserById.id);
    }
  }, [data, setUserIdState, setUsername]);

  // Get the label based on the user data
  const getLabel = () => {
    if (data && data.getUserById.username) {
      return language === 'en' ? 'Commenting as:' : 'Kommenterer som:';
    }
    return language === 'en' ? 'Choose a username' : 'Velg et brukernavn';
  };

  if (error) {
    console.error('Error fetching user by id');
  }

  return (
    <>
      {loading && <Loader size="sm" color="primary" />}
      <TextInput
        label={getLabel()}
        required={!data || !data.getUserById.username}
        aria-label="Enter your username"
        disabled={data && data.getUserById.username}
        error={
          buttonPressed && !username ? (language === 'en' ? 'Username is required' : 'Brukernavn er påkrevd') : null
        }
        value={username}
        onChange={(event) => {
          setUsername(event.currentTarget.value);
          setButtonPressed(false);
        }}
        styles={{
          root: {
            marginBottom: 30,
          },
          input: {
            backgroundColor: getColor(),
            color: isDark ? 'white' : 'black',
          },
        }}
      />
    </>
  );
}

export default UsernameInput;
