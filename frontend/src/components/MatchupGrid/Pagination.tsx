import { Pagination } from '@mantine/core';

interface PaginationProps {
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

function PaginationComponent({totalPages, page, setPage}: PaginationProps) {
    return (
        <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
        />
    );
}

export default PaginationComponent;