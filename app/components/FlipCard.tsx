import React from 'react';

interface FlipCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ image, title, subtitle, description, isFlipped, onFlip }) => {
  return (
    <div className="group h-[380px] w-full [perspective:1000px]" onClick={onFlip}>
      <div 
        className={`relative h-full w-full rounded-[2rem] transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        } group-hover:[transform:rotateY(180deg)]`}
      >
        
        {/* Front Side*/}
        <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-white p-8 [backface-visibility:hidden] flex flex-col text-center" style={{ boxShadow: '0 -2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 2px 0 4px -1px rgba(0, 0, 0, 0.06), -2px 0 4px -1px rgba(0, 0, 0, 0.06)', backgroundColor: '#F9F8F8' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
              <img src={image} alt={title} style={{ width: '220px', height: '142', objectFit: 'contain', filter: 'brightness(1.1)', borderRadius: '0.5rem', display: 'block' }} />
            </div>
            <div className="space-y-2" style={{ marginTop: 'auto', marginBottom: 'auto', paddingTop: '10rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ maxWidth: '90%', width: '100%' }}>
                <h3 className="text-2xl font-bold !text-[#2c1555]" style={{ color: '#2c1555', textAlign: 'center' }}>{title}</h3>
                <p className="!text-gray-500 font-medium text-lg leading-snug" style={{ color: '#6b7280', textAlign: 'left', marginTop: '0.5rem', marginLeft: '0.5rem'  }}>{subtitle}</p>
              </div>
            </div>
        </div>

        {/* Back Side*/}
        <div className="absolute inset-0 h-full w-full rounded-[2rem] p-10 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center text-center overflow-hidden" style={{ boxShadow: '0 -2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 2px 0 4px -1px rgba(0, 0, 0, 0.06), -2px 0 4px -1px rgba(0, 0, 0, 0.06)', background: 'linear-gradient(to top left, rgb(110, 66, 148), rgb(85, 57, 136),  rgb(59, 41, 91), rgb(34, 17, 64), rgb(29, 10, 62)' }}>
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-center py-4" style={{ maxWidth: '100%', width: '100%', alignItems: 'center' }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 className="text-3xl font-bold !text-white mb-6" style={{ color: 'rgb(238, 233, 241)', textAlign: 'center', marginLeft: '0.5rem', marginRight: '0.5rem'}}>{title}</h3>
                <div className="!text-white text-lg leading-relaxed" style={{ color: 'rgb(84, 34, 117)', textAlign: 'left', maxWidth: '85%' }}>
                  {description.split('\n').map((line, index) => (
                    line.trim() && (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <span style={{ marginRight: '0.5rem', color: 'rgb(223, 209, 235)' }}>•</span>
                        <span style={{ color: 'rgb(223, 209, 235)' }}>{line.trim()}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
