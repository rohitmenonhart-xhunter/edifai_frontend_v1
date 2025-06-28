import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaDribbble,
} from "react-icons/fa";
import dragon from '../Assets/dragon.svg';
interface TeamMember {
  name: string;
  role: string;
  company: string;
  socials: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Jake Weary",
    role: "Lead Designer",
    company: "Flowbase",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Sadie Berlin",
    role: "UI Designer",
    company: "Flowbase",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
 
  {
    name: "Cecilia Evans",
    role: "UI Designer",
    company: "Flowbase",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
];

export default function StarcTeam() {
  return (
    <section className="bg-white py-16 px-6 flex flex-col justify-start items-center  ">
      <div className="text-center mb-12 lg:w-[70%] 3xl:w-[1200px] flex ">
        <div className="flex flex-col justify-start ">
          <p className="text-[#8A63FF]  text-sm text-left  font-mont font-semibold  xl:text-[1.5rem]">
            Our Team
          </p>
          <h2 className="lg:text-2xl xl:text-2xl 2xl:text-3xl md:text-4xl  text-left font-mont font-medium mt-8">
            Edifai, Team:
          </h2>
        </div>
      </div>

      <div className="flex  justify-center w-full  h-[240px] ">
        <div className="flex flex-wrap justify-between items-center lg:w-[70%] xl:w-[63%%] 2xl:w-[63%] 3xl:w-[63%]">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="

        bg-white
        rounded-md
        p-1
        relative
        overflow-hidden
        shadow-sm
        lg:w-[31%] lg:h-[140px]
        xl:w-[31%] xl:h-[174px]
      2xl:w-[31%] 2xl:h-[194px]
      3xl:w-[31%] 3xl:h-[204px]"
            >
              <div className="  w-full h-[100%] rounded-md bg-[#F7F8FA] ">
                <div className="relative z-10  3xl:h-[70%]  3xl:p-5">
                  <h3 className="text-xl  text-gray-900 font-mont space-y-3 3xl:text-bold   ">
                    {member.name}
                  </h3>
                  <p className="text-sm font-mont text-gray-500 mt-1  3xl:p-3">
                    {member.role},{""}
                    <a href="#" className="text-purple-500 hover:underline">
                      {member.company}
                    </a>
                  </p>
                  <div className="flex gap-3 mt-4">
                    {member.socials.facebook && (
                      <a
                        href={member.socials.facebook}
                        aria-label="Facebook"
                        className="p-2 bg-gray-100 rounded-full text-purple-600 hover:bg-gray-200 transition"
                      >
                        <FaFacebookF size={16} />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        aria-label="Instagram"
                        className="p-2 bg-gray-100 rounded-full text-purple-600 hover:bg-gray-200 transition"
                      >
                        <FaInstagram size={16} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        aria-label="Twitter"
                        className="p-2 bg-gray-100 rounded-full text-purple-600 hover:bg-gray-200 transition"
                      >
                        <FaTwitter size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex w-full justify-end top-1 right-1 absolute ">
                  {/* Optional image placeholder - not visible in the provided image */}
                  <img src={dragon} className="   " />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
