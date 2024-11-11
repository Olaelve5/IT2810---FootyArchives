import { Switch } from '@mantine/core';

interface ExclusiveSwitchProps {
  exclusive: boolean;
  setExclusive: (exclusive: boolean) => void;
  selectedTeams: string[];
}

function ExclusiveSwitch({ exclusive, setExclusive, selectedTeams }: ExclusiveSwitchProps) {
  return (
    <Switch
      onChange={(event) => setExclusive(event.currentTarget.checked)}
      label="Exclusive"
      disabled={selectedTeams.length < 2}
      description="Show only exclusive matchups"
      color="blue"
      size="lg"
      checked={exclusive}
    />
  );
}

export default ExclusiveSwitch;
