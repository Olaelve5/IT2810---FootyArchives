import { Pagination } from '@mantine/core';
import classes from '../../styles/MatchupsSearch/Pagination.module.css';
import { useMantineColorScheme } from '@mantine/core';
import {IconArrowRight, IconArrowLeft} from '@tabler/icons-react';
import { useFilterStore } from '../../stores/filter-store';
import { useEffect, useState } from 'react';

interface PaginationProps {
  totalPages: number;
}

function PaginationComponent({ totalPages }: PaginationProps) {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const { page, setPage } = useFilterStore();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update window width on resize
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div className={classes.container}>
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        size={windowWidth < 768 ? 'sm' : 'md'}
        nextIcon={() => <IconArrowRight size={20} />}
        previousIcon={() => <IconArrowLeft size={20} />}
        siblings={windowWidth < 360 ? 0 : 1}
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
