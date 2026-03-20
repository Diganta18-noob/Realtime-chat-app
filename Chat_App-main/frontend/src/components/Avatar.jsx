const Avatar = ({ username, role, size = 40, isOnline, profilePic }) => {
  // Use profilePic from DB first; fall back to DiceBear generated avatar
  const fallbackStyle = role === "admin" ? "bottts" : "adventurer-neutral";
  const fallbackUrl = `https://api.dicebear.com/9.x/${fallbackStyle}/svg?seed=${encodeURIComponent(username)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  const imgSrc = profilePic || fallbackUrl;

  return (
    <div className={`avatar ${isOnline === true ? "online" : isOnline === false ? "offline" : ""}`} style={{ position: "relative" }}>
      <div style={{ width: size, height: size }} className="rounded-full">
        <img
          src={imgSrc}
          alt={username}
          width={size}
          height={size}
          className="avatar-img"
        />
      </div>
    </div>
  );
};

export default Avatar;
