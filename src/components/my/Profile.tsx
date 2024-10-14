import HeaderBar from '../common/bar/HeaderBar';
import settingimg from '../../assets/setting.svg';
import NagibationBar from '../common/bar/NavigationBar';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/my/setting");
  }

  return (
    <div>
      <HeaderBar label="마이페이지" icon={settingimg} onIconClick={onClick} />
      <NagibationBar/>
    </div>
  );
}
export default Profile;
