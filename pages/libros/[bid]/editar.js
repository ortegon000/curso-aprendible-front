import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export async function getServerSideProps({params}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.bid}`)

    const data = await res.json()

    console.log(data)
    
    return {
        props: {
            book: data
        }
    }
}

const BookEdit = ({book}) => {

    const router = useRouter()
    const [bookTitle, setBookTitle] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _method: 'PATCH',
                title: bookTitle
            })
        })

        if (res.ok) {
            setErrors([])
            setBookTitle('')

            return router.push('/libros')
        }

        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
    }
        

    return(
        <div>
            <h1>Editar Libros</h1>
            <Link href="/libros">Book List</Link>

            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => setBookTitle(event.target.value)} 
                    value={String(bookTitle)}
                    disabled={submitting}
                    type="text" 
                    placeholder="Title"
                    data-cy="input-book-title"
                />
                
                <button 
                    disabled={submitting}
                    data-cy="button-update-book"
                >
                    {submitting ? 'Enviando...' : 'Enviar'}
                </button>

                {errors.title && (
                    <span style={{ color: 'red', display: 'block' }}>
                        {errors.title}
                    </span>
                )}
            </form>
        </div>
    )
}

export default BookEdit
