import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div>About</div>
            <p>{a.state.name} is in {a.state.class}</p>
        </>
    )
}

export default About