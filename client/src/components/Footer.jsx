import React from 'react'

function Footer() {
  return (
    <footer className='App-footer'>
        <p>
            All Rights Reserved {new Date().getFullYear()}
        </p>
        <p>
            <a 
                href="https://www.alexandresteinhauslin.dev" 
                target="_blank">
                    Alexandre Steinhauslin
            </a>
        </p>
    </footer>
  )
}

export default Footer