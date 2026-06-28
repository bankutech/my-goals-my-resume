import React from 'react';
import { parseBullets, formatUrl } from '../../utils/textUtils';

const Minimal = ({ data }) => {
  return (
    <div className="p-[15mm] text-[10pt] leading-[1.6] text-[#333] font-light">
      <header className="mb-[10mm]">
        <h1 className="text-[28pt] font-medium tracking-tight mb-[2mm] text-black">{data.personal_name}</h1>
        {data.personal_title && <p className="text-[14pt] text-gray-500 mb-[4mm]">{data.personal_title}</p>}
        
        <div className="flex flex-col gap-[1mm] text-[9.5pt] text-gray-600">
          <div className="flex gap-[4mm]">
            {data.personal_email && <span>{data.personal_email}</span>}
            {data.personal_phone && <span>{data.personal_phone}</span>}
            {data.personal_location && <span>{data.personal_location}</span>}
          </div>
          <div className="flex gap-[4mm]">
            {data.personal_linkedin && <a href={data.personal_linkedin} className="text-gray-600">{formatUrl(data.personal_linkedin)}</a>}
            {data.personal_github && <a href={data.personal_github} className="text-gray-600">{formatUrl(data.personal_github)}</a>}
          </div>
        </div>
      </header>

      {data.personal_summary && (
        <section className="mb-[10mm]">
          <p className="text-[11pt] leading-[1.8]">{data.personal_summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-[10mm] flex">
          <div className="w-[30%] shrink-0">
            <h2 className="text-[12pt] font-medium tracking-widest text-gray-400 pt-[1mm]">Experience</h2>
          </div>
          <div className="w-[70%] space-y-[6mm]">
            {data.experience.map(exp => (
              <div key={exp.id} className="print:break-inside-avoid">
                <h3 className="text-[12pt] font-medium text-black">{exp.role}</h3>
                <div className="flex justify-between items-baseline mb-[2mm]">
                  <span className="text-gray-600">{exp.company}</span>
                  <span className="text-[9pt] text-gray-400">{exp.start_date} - {exp.end_date}</span>
                </div>
                {exp.details && (
                  <div className="text-gray-700">
                    {parseBullets(exp.details).map((line, i) => (
                      <p key={i} className="mb-[1mm] flex">
                        <span className="mr-[2mm] text-gray-300">-</span>
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="mb-[10mm] flex">
          <div className="w-[30%] shrink-0">
            <h2 className="text-[12pt] font-medium tracking-widest text-gray-400 pt-[1mm]">Projects</h2>
          </div>
          <div className="w-[70%] space-y-[6mm]">
            {data.projects.map(proj => (
              <div key={proj.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[12pt] font-medium text-black">{proj.name}</h3>
                  <span className="text-[9pt] text-gray-400">{proj.date}</span>
                </div>
                {proj.tech && <p className="text-gray-500 mb-[2mm] text-[9pt]">{proj.tech}</p>}
                {proj.details && (
                  <div className="text-gray-700">
                    {parseBullets(proj.details).map((line, i) => (
                      <p key={i} className="mb-[1mm] flex">
                        <span className="mr-[2mm] text-gray-300">-</span>
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills?.length > 0 && (
        <section className="mb-[10mm] flex">
          <div className="w-[30%] shrink-0">
            <h2 className="text-[12pt] font-medium tracking-widest text-gray-400 pt-[1mm]">Skills</h2>
          </div>
          <div className="w-[70%] space-y-[2mm]">
            {data.skills.map(skill => (
              <div key={skill.id} className="flex print:break-inside-avoid">
                {skill.category && <span className="font-medium text-gray-600 w-[40mm] shrink-0">{skill.category}</span>}
                <span className="text-gray-800">{skill.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="flex">
          <div className="w-[30%] shrink-0">
            <h2 className="text-[12pt] font-medium tracking-widest text-gray-400 pt-[1mm]">Education</h2>
          </div>
          <div className="w-[70%] space-y-[4mm]">
            {data.education.map(edu => (
              <div key={edu.id} className="print:break-inside-avoid">
                <h3 className="text-[12pt] font-medium text-black">{edu.school}</h3>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-[9pt] text-gray-400">{edu.start_date} - {edu.end_date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications?.length > 0 && (
        <section className="flex mt-[10mm]">
          <div className="w-[30%] shrink-0">
            <h2 className="text-[12pt] font-medium tracking-widest text-gray-400 pt-[1mm]">Certifications</h2>
          </div>
          <div className="w-[70%] space-y-[4mm]">
            {data.certifications.map(cert => (
              <div key={cert.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[12pt] font-medium text-black">{cert.name}</h3>
                  <span className="text-[9pt] text-gray-400">{cert.date}</span>
                </div>
                {cert.issuer && <p className="text-gray-600 mt-[1mm]">{cert.issuer}</p>}
                {cert.description && <p className="text-gray-700 mt-[1mm]">{cert.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Minimal;
