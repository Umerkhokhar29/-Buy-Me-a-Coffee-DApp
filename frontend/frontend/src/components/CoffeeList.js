import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./cardstyle.css"; // Add hover effect styles here

const demoCoffees = [
  {
    from: "0x1234...abcd",
    timestamp: "2025-06-15 12:45",
    name: "Umer",
    message: "You’re doing amazing work!",
    amount: "0.003 ETH",
    image: "/images/coffee3.jpg",
  },
  {
    from: "0x4567...efgh",
    timestamp: "2025-06-14 17:32",
    name: "Owais",
    message: "Keep it up!",
    amount: "0.001 ETH",
    image: "/images/coffee1.jpg",
  },
  {
    from: "0x7890...ijkl",
    timestamp: "2025-06-13 10:20",
    name: "Nazia",
    message: "This coffee is on me ☕",
    amount: "0.004 ETH",
    image: "/images/coffee4.jpg",
  },
];

const CoffeeList = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="container mt-5 pb-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">☕ Coffee Received</h2>
        <p className="text-muted">Thanks to these awesome supporters!</p>
      </div>
      <div className="row">
        {demoCoffees.map((coffee, index) => (
          <div
            key={index}
            className="col-md-6 col-lg-4 mb-4"
            data-aos="fade-up"
          >
            <div className="card coffee-hover h-100 border-0 rounded-4 shadow-sm">
              <img
                src={coffee.image}
                className="card-img-top rounded-top-4"
                alt="Coffee"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{coffee.name}</h5>
                <p className="card-text fst-italic text-muted">"{coffee.message}"</p>
                <ul className="list-unstyled small mt-3">
                  <li><span className="fw-semibold text-success">💸</span> 
                    <span className="badge bg-light text-dark border fw-semibold">{coffee.amount}</span>
                  </li>
                  <li><span className="fw-semibold">🧾</span> {coffee.timestamp}</li>
                  <li><span className="fw-semibold">🧍‍♂️</span> <code>{coffee.from}</code></li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeList;
