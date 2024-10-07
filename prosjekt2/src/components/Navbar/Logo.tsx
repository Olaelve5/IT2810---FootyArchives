import{ Text } from '@mantine/core'

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
        <Text size="xl" fw={700} c = "primary">Footy</Text>
        <Text size="xl" fw={700} >Archives</Text>
    </div>
  );
}

export default Logo;