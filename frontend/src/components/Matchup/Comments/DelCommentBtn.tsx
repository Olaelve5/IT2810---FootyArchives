import { Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import classes from '../../../styles/Matchup/Comment.module.css';
import { useMantineColorScheme, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


function DelCommentBtn() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button className={classes.deleteButton} size="xs" color="red" radius="xl" onClick={open}>
        <IconTrash
          size={20}
          color="white"
          className={`${classes.deleteIcon} ${isDark ? classes.deleteIconDark : classes.deleteIconLight}`}
        />
      </Button>
      <Modal opened={opened} onClose={close}></Modal>
    </>
  );
}

export default DelCommentBtn;
