import Link from "next/link";

export async function getStaticProps() {

    console.log(process.env.NEXT_PUBLIC_API_URL)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`)
    const data = await res.json()

    return {
        props: {
            books: data
        }
    }
}

const BookList = ({ books }) => {

    async function handleDelete(event, bookId) {
        event.preventDefault()

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _method: 'DELETE',
            })
        })

        if (res.ok) {
            window.location.href = '/libros'
        }
    }

    return(
        <div>
            <h1>Libros</h1>
            
            <Link href="/libros/crear">Create Book</Link>

            <ul data-cy="book-list">
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link 
                            href={`/libros/${book.id}`} 
                            data-cy={`link-to-visit-book-${book.id}`}
                        >
                            {book.title}
                        </Link>
                        
                        {' - '}
                        
                        <Link 
                            href={`/libros/${book.id}/editar`}
                            data-cy={`link-to-edit-book-${book.id}`}
                        >Editar</Link>
                        {' - '}
                        <form 
                            onSubmit={(event) => handleDelete(event, book.id)}
                            style={{display: 'inline'}}
                        >

                            <button
                                data-cy={`link-to-delete-book-${book.id}`}
                            >Borrar</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList;
