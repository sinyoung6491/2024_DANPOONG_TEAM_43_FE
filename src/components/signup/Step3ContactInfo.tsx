import React, { useEffect, useState } from 'react';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar2.svg';
import ExitConfirmationModal from './ExitConfirmationModal';

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onNext: () => void;
}

const Step3ContactInfo: React.FC<Step3Props> = ({ formData, setFormData, onNext, onBackClick}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const isNextEnabled = formData.phoneNum && formData.address && formData.detailAddress;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setFormData({ ...formData, address: data.address });
        },
      }).open();
    } else {
      console.error('Daum Postcode API is not loaded');
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phoneNum: formatPhoneNumber(e.target.value) });
  };

  return (
    <div className="w-full flex flex-col items-center justify-between h-[calc(100dvh)]">
      <div className="relative w-full flex items-center justify-center my-6">
      <img
          src={leftButtonIcon}
          alt="Back"
          className="absolute left-0 w-6 h-6 cursor-pointer"
          onClick={() => setShowExitModal(true)}
        />
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">회원가입</div>
      </div>
      <img src={progressBar} alt="Progress Bar" className="w-full mb-8" />
      <h2 className="text-[#2a2e37] text-xl font-semibold mb-6 w-full text-left">주소와 전화번호를 입력해주세요</h2>
      <div className="flex flex-col gap-6 w-full">
        <div>
          <label className="block text-gray-700 mb-2">전화번호</label>
          <input
            type="text"
            placeholder="연락 가능한 번호를 적어주세요"
            value={formData.phoneNum}
            onChange={handlePhoneNumberChange}
            className="w-full focus:outline-none placeholder-gray-400 pb-2"
            style={{
              borderBottom: '1px solid #d1d5db',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
            onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">주소</label>
          <input
            type="text"
            placeholder="주소를 입력하세요"
            value={formData.address}
            onClick={handleAddressSearch}
            readOnly
            className="w-full placeholder-gray-400 pb-2 cursor-pointer"
            style={{
              borderBottom: '1px solid #d1d5db',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
            onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">상세 주소</label>
          <input
            type="text"
            placeholder="상세 주소를 입력하세요"
            value={formData.detailAddress}
            onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
            className="w-full focus:outline-none placeholder-gray-400 pb-2"
            style={{
              borderBottom: '1px solid #d1d5db',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
            onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
          />
        </div>
      </div>
      <div className="w-full mt-auto mb-6 px-4">
        <button
          onClick={onNext}
          disabled={!isNextEnabled}
          className={`w-full h-14 rounded-lg ${isNextEnabled ? 'bg-[#ff6b6b]' : 'bg-gray-200'} text-white font-semibold text-lg`}
        >
          다음
        </button>
      </div>
      {showExitModal && (
        <ExitConfirmationModal
          onConfirm={onBackClick} 
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
};

export default Step3ContactInfo;