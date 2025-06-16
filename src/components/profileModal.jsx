import { useTheme } from "../utils/ThemeContext";
import avathar from '../../public/assets/default.jpg'

const ProfileModal = ({ user, onClose, onImageUpload, isReadOnly }) => {
    const {isDarkMode} = useTheme();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageUpload(file);
            onClose();
        }
    };

  return (
    <div className="fixed inset-0 bg-[#033c648c] flex items-center justify-center z-[200]">
      <div className="rounded-lg shadow-lg w-[400px] p-4 flex flex-col justify-center items-center">
        <img src={user?.image || avathar} className="w-[150px] h-[150px] rounded-md object-cover mb-4" alt="User Profile"/>
        <h2 className="text-lg font-semibold mb-2 text-white">{user?.fullName}</h2>
        <p className="text-gray-200 mb-2">@{user?.username}</p>
        <p className="text-gray-200 mb-4">{user?.email}</p>
        {!isReadOnly && (
          <label className="block mb-4 cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange}/>
            <span className={`${isDarkMode?"underline text-blue-400": "underline text-blue-800"}`}>Upload New Profile Picture</span>
          </label>
        )}
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
