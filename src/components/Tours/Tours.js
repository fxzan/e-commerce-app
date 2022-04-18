import TourItems from "./TourItems";
import "./Tours.css";

function Tours() {
  const tourList = [
    {
      date: "JUL 16",
      city: "Detroit, MI",
      arena: "DTE Energy Music Theatre",
    },
    {
      date: "JUL 19",
      city: "Toronto, ON",
      arena: "Budweiser Stage",
    },
    {
      date: "JUL 22",
      city: "Bristow, VA",
      arena: "Jiggy Lube Live",
    },
    {
      date: "JUL 29",
      city: "Phoenix, AZ",
      arena: "AK-Chin Pavilion",
    },
    {
      date: "AUG 02",
      city: "Las Vegas, NV",
      arena: "T-Mobile Arena",
    },
    {
      date: "AUG 07",
      city: "Concord, CA",
      arena: "Concord Pavilion",
    },
  ];

  const tourItems = (
    <ul>
      {tourList.map((tour) => (
        <TourItems key={tour.date} tour={tour} />
      ))}
    </ul>
  );

  return (
    <div className="tour-container">
      <h2>Tours</h2>
      {tourItems}
    </div>
  );
}

export default Tours;
