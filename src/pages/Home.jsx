import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import book from '../assets/book.webp';
import { Card } from 'react-bootstrap';



const Home = () => {
  return (
    <>


      <div>
        <Hero />
        <div style={{ minHeight: '100vh' }} className="flex flex-col justify-center items-center">
          <h1 className='fw-bold text-5xl'>A library you'll want to get lost in!</h1>
          <img width='520px' height='520px' className='img-fluid' src={book} alt="landing" />


          <h1 className="flex justify-center items-center text-5xl"><i className="fa-solid fa-book"></i>bookStore</h1>
          <marquee>
            <p className='fw-bold text-3xl' style={{ textAlign: 'justify', color: 'green' }}>Browse our global catalog featuring millions of bestsellers, new releases, and classics —  added every week.!!!
            </p>
          </marquee>
        </div>
        <RecentlyAdded />

        <h1 className='text-center'>Our Testimonials</h1>
        <div className="d-flex align-items-center justify-content-evenly mt-3 w-100 mb-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://tse2.mm.bing.net/th?id=OIP.xpmspqmeooIchs0zi7aJ9wHaHa&pid=Api&P=0&h=220" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>

                  <i className="fa-solid fa-star text-warning"></i>

                  <i className="fa-solid fa-star text-warning"></i>

                </div>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://tse2.mm.bing.net/th?id=OIP.xpmspqmeooIchs0zi7aJ9wHaHa&pid=Api&P=0&h=220" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>

                  <i className="fa-solid fa-star text-warning"></i>

                  <i className="fa-solid fa-star text-warning"></i>

                </div>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://tse2.mm.bing.net/th?id=OIP.xpmspqmeooIchs0zi7aJ9wHaHa&pid=Api&P=0&h=220" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>

                  <i className="fa-solid fa-star text-warning"></i>

                  <i className="fa-solid fa-star text-warning"></i>

                </div>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

      </div>
    </>

  )
}

export default Home