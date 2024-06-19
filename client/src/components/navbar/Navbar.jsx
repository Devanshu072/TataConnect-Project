// import "./navbar.scss";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { AuthContext } from "../../context/authContext";

// const Navbar = () => {
//   const { toggle, darkMode } = useContext(DarkModeContext);
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <div className="navbar">
//       <div className="left">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span>Tata-Connect</span>
//         </Link>
//         <HomeOutlinedIcon />
//         {darkMode ? (
//           <WbSunnyOutlinedIcon onClick={toggle} />
//         ) : (
//           <DarkModeOutlinedIcon onClick={toggle} />
//         )}
//         <GridViewOutlinedIcon />
//         <div className="search">
//           <SearchOutlinedIcon />
//           <input type="text" placeholder="Search..." />
//         </div>
//       </div>
//       <div className="right">
//         <PersonOutlinedIcon />
//         <EmailOutlinedIcon />
//         <NotificationsOutlinedIcon />
//         <div className="user">
//           <img
//             src={"/upload/" + currentUser.profilePic}
//             alt=""
//           />
//           <span>{currentUser.name}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 2) {
      try {
        const response = await makeRequest.get(`/users/search?q=${event.target.value}`);
        setSearchResults(response.data);
      } catch (err) {
        console.log('Search request failed', err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (userId) => {
    navigate(`/profile/${userId}`);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.ID}`);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Tata-Connect</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map(user => (
                <div 
                  key={user.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(user.id)}
                >
                  <img 
                    src={`/upload/${user.profilePic}`} // Correctly format the profilePic URL
                    alt={user.username} 
                    className="profile-pic"
                  />
                  <span>{user.username}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <img
            src={`/upload/${currentUser.profilePic}`}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
