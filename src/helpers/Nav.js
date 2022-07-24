import React from 'react'

export default function Nav({algo}) {
  return (
    <div className='nav'>
      <a href="/"><h1 className="logo">algo-visualizer</h1></a>
      <h1>{algo}</h1>
    </div>
  )
}
