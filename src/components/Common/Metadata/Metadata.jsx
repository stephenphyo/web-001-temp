import { Helmet } from 'react-helmet';

export default function Metadata({ title }) {
    return (
        <Helmet>
            <title>{`${title} - Phoenix Talk `}</title>
        </Helmet>
    );
}