import { useState, useEffect } from 'react';




function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  


 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [children.length]);

  return (
    <div className='carousel-container'>
      {children.map((child, index) => (
        <div
          key={index}
          
          style={{ display: index === currentIndex ? 'block' : 'none' }}
        >
          {child}
        </div>
      ))}
      
    </div>
  );
}

export default Carousel;
