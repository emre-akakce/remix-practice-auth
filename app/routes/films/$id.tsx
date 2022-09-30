import { useParams } from '@remix-run/react'

function FilmDetail() {
  const params = useParams();

  return (
    <>
        <h1>Film {params.id}</h1>
    </>
  )
}

export default FilmDetail
