import React from 'react'

function Home({ userName, signedIn }) {
  return (
    signedIn
      ?
      <h2>
        Welcome {userName},
      </h2>
      :
      <h1>
        Welcome to HDS! Start booking now.
      </h1>

  )
}

export default Home
