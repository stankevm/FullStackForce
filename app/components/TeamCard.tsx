import Image from "next/image";

interface TeamCardProps {
  imageSrc: string;
  name: string;
  role: string;
  imgSize?: number; 
}

const TeamCard: React.FC<TeamCardProps> = ({ imageSrc, name, role, imgSize = 128 }) => {
  return (
    <div className="team-card">
      <div
        className="team-photo-wrapper"
        style={{ width: imgSize, height: imgSize }}
      >
        <Image
          src={imageSrc}
          alt={name}
          width={imgSize}
          height={imgSize}
          className="team-photo"
        />
      </div>
      <h3 className="team-name">{name}</h3>
      <p className="team-role">{role}</p>
    </div>
  );
};

export default TeamCard; 