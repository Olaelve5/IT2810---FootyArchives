
import { useMantineColorScheme, Button } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ColorSchemeBtn() {
    const { colorScheme, setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
      });
    
    return (
        <Button
        onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        color="primary"
        style={{ height: '35px', width: '35px', padding: '0' }}
        >
        {colorScheme === 'dark' ? <IconSun size={20}/> : <IconMoon size={20}/>}
        </Button>
    );
}