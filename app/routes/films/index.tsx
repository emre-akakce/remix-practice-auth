import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
    return {
        films: [
            { id: "1", name: 'Test' },
            { id: "2", name: 'Film' }
        ]
    }
}

interface Film {
    id: string;
    name: string
}

function index() {
    const { films } = useLoaderData()
    return (
        <div>
            {films.map((film: Film) => {
                return (
                    <>
                        <Link to={film.id}>
                            {film.name}
                        </Link>
                        <br></br>
                    </>
                )
            })}
        </div>
    )
}

export default index
