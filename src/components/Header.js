import "./Header.css";

const Header = () => {
  return (
    <div className="d-flex align-items-center mb-3 mb-md-0 link-light text-decoration-none justify-content-between header">
      <div className="text-start h2">Boonmafarm</div>
      <div className="text-end btn btn-secondary">
        <i className="fa-regular fa-bell"></i>
      </div>
    </div>
  );
};

export default Header;
