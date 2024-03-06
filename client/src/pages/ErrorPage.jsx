import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <p>404 Page Not Found</p>
        <p>Ooops, looks like you got lost. Don't worry, I can help you find your way <Link to="/"><b>back.</b></Link></p>
    </div>
  )
}

export default ErrorPage