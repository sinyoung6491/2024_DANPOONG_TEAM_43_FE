import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrow from '../../assets/img/mypage/right-arrow.svg';

interface MenuItemProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  const navigate = useNavigate(); 

  const handleNavigation = ({}) => {
    navigate('/certificate-person-page',{state:{label}}); 
  };
  return(
  <div className="flex items-center justify-between w-full py-3">
    <span className="text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">{label}</span>
    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4" onClick={handleNavigation}/>
  </div>
);};

export default MenuItem;

