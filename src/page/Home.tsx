import React, { useEffect, useState } from 'react';
import UserGreeting from 'components/home/UserGreeting';
import UserInfoCard from 'components/home/UserInfoCard';
import NeighborSuggestions from 'components/home/NeighborSuggestions';
import MapSection from 'components/home/MapSection';
import Memories from 'components/home/Memories';
import ConnectAI from 'components/home/ConnectAI';
import { useUserDataQuery } from 'service/user';
import caregiverBg from '../assets/img/home/main_caregiver.svg';
import volunteerBg from '../assets/img/home/main_volunteer.svg';
import careWorkerBg from '../assets/img/home/main_careworker.svg';
import { checkLocationAuthentication } from 'service/locationVerification';
import { useUserStore } from 'stores/useUserStore';

const Home: React.FC = () => {
  const { data: userData, isLoading } = useUserDataQuery();
  const [isLocationAuthenticated, setIsLocationAuthenticated] = useState<boolean | null>(null); 
  const userInfo = useUserStore((state) => state.userInfo);

  useEffect(() => {
    const fetchLocationAuthentication = async () => {
      try {
        const response = await checkLocationAuthentication();
        setIsLocationAuthenticated(response.data.locationAuthentication);
      } catch (error) {
        console.error('Failed to fetch location authentication', error);
        setIsLocationAuthenticated(false); 
      }
    };

    fetchLocationAuthentication();
  }, []);

  if (isLoading || isLocationAuthenticated === null) {
    return null;
  }

  if (!userData) {
    return null;
  }

  const backgroundSettings = {
    CAREGIVER: { color: 'bg-[#ffe5e5]', image: caregiverBg },
    VOLUNTEER: { color: 'bg-[#eef7ff]', image: volunteerBg },
    CARE_WORKER: { color: 'bg-[#d8fbed]', image: careWorkerBg },
  };

  const { color, image } = backgroundSettings[userData.userType] || backgroundSettings['CAREGIVER'];

  return (
    <div className={`relative ${color} max-w-[440px] min-w-[340px] w-full mx-auto pb-[100px] pb-8 overflow-y-auto`}>
      <img
        src={image}
        alt="UserType Background"
        className="absolute top-[3.8rem] right-0 h-auto"
        style={{
          width: 'auto',
          objectFit: 'cover',
          objectPosition: 'right',
        }}
      />
      <div className="w-full mx-auto relative z-10 overflow-y-auto">
      {(!isLocationAuthenticated || userInfo.userType === "CAREGIVER") && (
        <div className="w-[90%] mx-auto">
          <UserGreeting username={userData.username} userType={userData.userType} />
        </div>
      )}
      <div className="w-[90%] mx-auto">
        {isLocationAuthenticated && userInfo.userType !== "CAREGIVER" ? (
          <ConnectAI />
        ) : (
          <UserInfoCard userType={userData.userType} city={userData.city} />
        )}
      </div>
        <NeighborSuggestions />
        <div className="w-[90%] mx-auto">
          <MapSection userData={userData} />
        </div>
        <div className="w-[90%] mx-auto">
          <Memories />
        </div>
      </div>
    </div>
  );
};

export default Home;