import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const BookCreate = () => {

    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            <h1>Crear Libros</h1>
            <Link href="/libros">Book List</Link>

            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => setBookTitle(event.target.value)} 
                    value={bookTitle}
                    disabled={submitting}
                    type="text" 
                    placeholder="Title"
                    data-cy="input-book-title"
                />
                
                <button 
                    disabled={submitting}
                    data-cy="button-submit-book"
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

export default BookCreate
