import React from 'react'

function Footer() {
  return (
    <div>
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
    </div>
  )
}

export default Footer