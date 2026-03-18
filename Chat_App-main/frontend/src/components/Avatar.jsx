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
          style={{
            borderRadius: "50%",
            border: "2px solid rgba(139,92,246,0.4)",
            objectFit: "cover",
            background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))",
          }}
        />
      </div>
    </div>
  );
};

export default Avatar;
