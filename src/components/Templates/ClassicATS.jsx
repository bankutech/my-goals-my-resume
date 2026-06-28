import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { parseBullets, formatUrl } from '../../utils/textUtils';

const LinkedinIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const GithubIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const ClassicATS = ({ data }) => {
  const contactItems = [];
  if (data.personal_location) contactItems.push(<span key="loc" className="flex items-center gap-1 whitespace-nowrap"><MapPin size={12} /> {data.personal_location}</span>);
  if (data.personal_phone) contactItems.push(<span key="phone" className="flex items-center gap-1 whitespace-nowrap"><Phone size={12} /> {data.personal_phone}</span>);
  if (data.personal_email) contactItems.push(<span key="email" className="flex items-center gap-1 whitespace-nowrap"><Mail size={12} /> {data.personal_email}</span>);
  if (data.personal_linkedin) contactItems.push(<a key="linkedin" href={data.personal_linkedin} className="flex items-center gap-1 whitespace-nowrap text-black no-underline"><LinkedinIcon size={12} /> {formatUrl(data.personal_linkedin)}</a>);
  if (data.personal_github) contactItems.push(<a key="github" href={data.personal_github} className="flex items-center gap-1 whitespace-nowrap text-black no-underline"><GithubIcon size={12} /> {formatUrl(data.personal_github)}</a>);

  return (
    <div className="p-[10mm] text-[10pt] leading-[1.4] text-black">
      {/* Header */}
      <header className="text-center mb-[5mm]">
        <h1 className="text-[24pt] font-bold tracking-tight mb-[1mm] leading-none ">{data.personal_name}</h1>
        {data.personal_title && <p className="text-[12pt] font-semibold text-gray-800 mb-[2mm]">{data.personal_title}</p>}
        
        <div className="flex flex-wrap justify-center items-center gap-x-[2.5mm] gap-y-[1mm] text-[9.5pt]">
          {contactItems.map((item, index) => (
            <React.Fragment key={item.key}>
              {item}
              {index < contactItems.length - 1 && <span className="text-gray-400">|</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      {data.personal_summary && (
        <section className="mb-[4mm]">
          <p className="text-justify">{data.personal_summary}</p>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-[4mm]">
          <h2 className="text-[11pt] font-bold border-b border-black mb-[2mm] pb-[1mm] tracking-wide">Education</h2>
          <div className="space-y-[3mm]">
            {data.education.map(edu => (
              <div key={edu.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.school}</h3>
                  <span>{edu.start_date} {edu.start_date && edu.end_date && '-'} {edu.end_date}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="italic">{edu.degree}</span>
                  <span className="italic">{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-[4mm]">
          <h2 className="text-[11pt] font-bold border-b border-black mb-[2mm] pb-[1mm] tracking-wide">Technical Skills</h2>
          <div className="space-y-[1mm]">
            {data.skills.map(skill => (
              <div key={skill.id} className="flex print:break-inside-avoid">
                {skill.category && <span className="font-bold w-[35mm] shrink-0">{skill.category}:</span>}
                <span>{skill.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-[4mm]">
          <h2 className="text-[11pt] font-bold border-b border-black mb-[2mm] pb-[1mm] tracking-wide">Projects</h2>
          <div className="space-y-[3mm]">
            {data.projects.map(proj => (
              <div key={proj.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-[1mm]">
                  <span>
                    <span className="font-bold">{proj.name}</span>
                    {proj.tech && <span className="italic text-gray-800"> | {proj.tech}</span>}
                  </span>
                  <span>{proj.date}</span>
                </div>
                <div className="text-[9pt] flex gap-2 mb-[1mm]">
                  {proj.link && <a href={proj.link} className="text-black">Live Link</a>}
                  {proj.link && proj.github_link && <span>|</span>}
                  {proj.github_link && <a href={proj.github_link} className="text-black">GitHub</a>}
                </div>
                {proj.details && (
                  <ul className="list-disc pl-[5mm] space-y-[1mm] marker:text-[8pt]">
                    {parseBullets(proj.details).map((line, i) => (
                      <li key={i} className="pl-[1mm]">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-[4mm]">
          <h2 className="text-[11pt] font-bold border-b border-black mb-[2mm] pb-[1mm] tracking-wide">Professional Experience</h2>
          <div className="space-y-[3mm]">
            {data.experience.map(exp => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-[1mm]">
                  <h3 className="font-bold text-[10.5pt]">{exp.role}</h3>
                  <span className="font-semibold">{exp.start_date} {exp.start_date && exp.end_date && '-'} {exp.end_date}</span>
                </div>
                <div className="flex justify-between items-baseline mb-[2mm]">
                  <span className="italic">{exp.company}</span>
                  <span className="italic">{exp.location}</span>
                </div>
                {exp.details && (
                  <ul className="list-disc pl-[5mm] space-y-[1mm] marker:text-[8pt]">
                    {parseBullets(exp.details).map((line, i) => (
                      <li key={i} className="pl-[1mm]">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <section className="print:break-inside-avoid">
          <h2 className="text-[11pt] font-bold border-b border-black mb-[2mm] pb-[1mm] tracking-wide">Certifications</h2>
          <div className="space-y-[2mm]">
            {data.certifications.map(cert => (
              <div key={cert.id} className="mb-[1mm]">
                <div className="flex justify-between">
                  <span><span className="font-bold">{cert.name}</span> {cert.issuer && `- ${cert.issuer}`}</span>
                  <span>{cert.date}</span>
                </div>
                {cert.description && (
                  <div className="text-[9.5pt] mt-[0.5mm] text-gray-800">
                    {cert.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicATS;
