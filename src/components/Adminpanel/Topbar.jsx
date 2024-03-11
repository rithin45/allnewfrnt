import './Topbar.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/nav');
  };

  return (
    <div className='topbar'>
      <div className="topbarwrapper">
        <div className="topleft">
          <p>DAILY KART</p>
        </div>
        <div className='topright'>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
