import { Pagination } from '@mantine/core';
import classes from '../../styles/MatchupsSearch/Pagination.module.css';
import { useMantineColorScheme } from '@mantine/core';
import {IconArrowRight, IconArrowLeft} from '@tabler/icons-react';

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

function PaginationComponent({ totalPages, page, setPage }: PaginationProps) {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

  return (
    <div className={classes.container}>
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        nextIcon={() => <IconArrowRight size={20} />}
        previousIcon={() => <IconArrowLeft size={20} />}
        siblings={1}
        classNames={{
          root: classes.root,
          control: isDark ? classes.controlDark : classes.controlLight,
          dots: classes.dots,
        }}
      />
    </div>
  );
}

export default PaginationComponent;
