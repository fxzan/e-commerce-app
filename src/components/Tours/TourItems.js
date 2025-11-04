import "./TourItems.css";

function TourItems(props) {
  return (
    <li className="tour-item">
      <div className="date">{props.tour.date}</div>
      <div className="city">{props.tour.city}</div>
      <div className="arena">{props.tour.arena}</div>
      <a href="https://www.ticketmaster.com/" target="_blank" rel="noreferrer">
        <button className="action-button buy-button">Buy Tickets</button>
      </a>
    </li>
  );
}

export default TourItems;
