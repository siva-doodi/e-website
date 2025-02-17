import { useState } from "react";

const CardCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-full mt-10 mb-10">
      {/* Carousel Container */}
      <div className="overflow-hidden relative">
        {/* Card Wrapper */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt={card.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                  <p className="text-gray-600">{card.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left and Right Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2"
      >
        &gt;
      </button>
    </div>
  );
};

export default CardCarousel;
