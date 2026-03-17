const Avatar = ({ username, role, size = 40, isOnline }) => {
  const style = role === "admin" ? "bottts" : "avataaars";
  const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(username)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <div className={`avatar ${isOnline === true ? "online" : isOnline === false ? "offline" : ""}`} style={{ position: "relative" }}>
      <div style={{ width: size, height: size }} className="rounded-full">
        <img
          src={url}
          alt={username}
          width={size}
          height={size}
          style={{
            borderRadius: "50%",
            border: "2px solid rgba(139,92,246,0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default Avatar;
