import React, { useEffect } from 'react'
import About from '../../compontens/about/About'
import Foote from '../../compontens/footer/Foote'
import Items from '../../compontens/items/Items'
import Menu from '../../compontens/menu/Menu'
import Navbar from '../../compontens/navbar/Navbar'
import Slider from '../../compontens/slider/Slider'

const Home = ({active, setActive}) => {


    const scroll = ()=>{
            window.scrollY>0 ?setActive(true):setActive(false)
    }
    useEffect(()=>{
        window.addEventListener("scroll", scroll)
        return ()=>{
            window.removeEventListener("scroll", scroll)
        }

    },[])
  return (
      <div class="home">
        <Navbar/>
        {active && <Menu/>}
        <Slider/>
        <Items />
        <About/>
        <Foote/>

        </div>
  )
}

export default Home