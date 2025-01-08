export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">TIPSTERZONE</div>
        <div className="burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav></nav>
    </header>
  );
};

export default Header;
