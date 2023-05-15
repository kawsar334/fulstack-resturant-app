import React from 'react'

const Loader = () => {
  return (
    <>
      <div className='' style={{ width:"100vw",height:"100vh",display:"flex", justifyContent:"center", alignItems:"center" ,flexDirection:"column"}}>

      <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
    <span>Refresh your browser </span>
    </div>
    </>
  )
}

export default Loader