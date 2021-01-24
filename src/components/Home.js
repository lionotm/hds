import React from 'react'

function Home({ userName, signedIn }) {
  return (
    signedIn ?
      <h2>
        Welcome {userName},
      </h2>
      : ""

  )
}

export default Home
