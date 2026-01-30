import './TransitMap.css';

function TransitMap() {
  return (
    <div className="transit-map-container">
      <img src="/images/riverImg.svg" alt="River background" className="transit-layer river" />
      <img src="/images/experienceLine.svg" alt="Experience line" className="transit-layer experience" />
      <img src="/images/projectsLine.svg" alt="Projects line" className="transit-layer projects" />
      <img src="/images/skillsLine.svg" alt="Skills line" className="transit-layer skills" />
      <img src="/images/star.svg" alt="Star" className="transit-layer star" />
    </div>
  );
}

export default TransitMap;