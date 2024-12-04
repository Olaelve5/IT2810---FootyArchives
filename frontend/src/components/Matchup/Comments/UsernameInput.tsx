import { Loader, TextInput } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { GET_USER_BY_ID } from '../../../graphql/userOperations';
import { getUserId } from '../../../utils/localStorageUtils';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

interface UsernameInputProps {
  username: string;
  setUsername: (username: string) => void;
  buttonPressed: boolean;
  setButtonPressed: (buttonPressed: boolean) => void;
  setUserIdState: (userId: string) => void;
  parentError: ApolloError | undefined;
}

function UsernameInput({
  username,
  setUsername,
  buttonPressed,
  setButtonPressed,
  setUserIdState,
  parentError,
}: UsernameInputProps) {
  const { language } = useLanguageStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();
  const [errorMessage, setErrorMessage] = useState('');

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

  // Set error message based on the error
  useEffect(() => {
    if (parentError) {
      // Check for the specific duplicate username error
      if (parentError.message.includes('The username is already taken')) {
        setErrorMessage(language === 'en' ? parentError.message : 'Brukernavnet er allerede i bruk.');
        return;
      }

      // Handle generic errors
      setErrorMessage(
        language === 'en' ? 'An error occurred. Please try again.' : 'En feil oppstod. Vennligst prøv igjen.',
      );
    }

    // Handle validation for missing username
    if (buttonPressed && !username) {
      setErrorMessage(language === 'en' ? 'Username is required' : 'Brukernavn er påkrevd');
    }

    // Reset error message if no error
    if (!parentError && !buttonPressed && !username) {
      setErrorMessage('');
    }
  }, [parentError, buttonPressed, username, language]);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        language === 'en'
          ? 'An error occurred. Please try again or create a new user.'
          : 'En feil oppstod. Vennligst prøv igjen eller lag en ny bruker.',
      );
    }
  }, [error, language]);

  return (
    <>
      {loading && <Loader size="sm" color="primary" />}
      <TextInput
        label={getLabel()}
        required={!data || !data.getUserById.username}
        aria-label="Enter your username"
        disabled={data && data.getUserById.username}
        error={errorMessage}
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
