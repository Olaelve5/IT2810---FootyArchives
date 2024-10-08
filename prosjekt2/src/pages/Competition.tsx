import { useParams } from "react-router-dom";


export default function Competition() {
    const { competition } = useParams<{ competition: string }>();

    const getCleanName = () => {
        if (competition === undefined) {
            return '';
        }
        return competition.replace(/-/g, ' ');
    }

    return (
        <div>
            <h1>{getCleanName()}</h1>
            <p>Competition page</p>
        </div>
    );
}
