import Link from "next/link"

export async function getStaticProps({params}) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.bid}`)
    const data = await res.json()

    return {
        props: {
            book: data
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`)
    const data = await res.json()

    return {
        paths: data.map(book => ({
            params: {bid: String(book.id)}
        })),
        fallback: false
    }
}

const BookDetail = ({ book }) => {
    return(
        <div>
            <h1>{book.title}</h1>
            <Link href="/libros">Book List</Link>
        </div>
    )
}

export default BookDetail;
