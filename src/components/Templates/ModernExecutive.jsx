import React from 'react';
import { parseBullets, formatUrl } from '../../utils/textUtils';

const ModernExecutive = ({ data }) => {
  return (
    <div className="flex min-h-[297mm] text-[10pt] leading-[1.5] text-gray-800">
      {/* Left Column */}
      <div className="w-[35%] bg-[#2A3B4C] text-white p-[10mm] shrink-0">
        <div className="mb-[10mm]">
          <h1 className="text-[22pt] font-light leading-tight mb-[2mm]">{data.personal_name}</h1>
          <h2 className="text-[12pt] font-semibold text-[#8BA4B9]">{data.personal_title}</h2>
        </div>

        <div className="space-y-[4mm] text-[9pt] mb-[10mm]">
          <h3 className="text-[11pt] font-semibold tracking-widest border-b border-[#43596D] pb-[2mm] mb-[4mm]">Contact</h3>
          {data.personal_email && <p>{data.personal_email}</p>}
          {data.personal_phone && <p>{data.personal_phone}</p>}
          {data.personal_location && <p>{data.personal_location}</p>}
          {data.personal_linkedin && <p><a href={data.personal_linkedin} className="text-[#8BA4B9] no-underline">LinkedIn</a></p>}
          {data.personal_github && <p><a href={data.personal_github} className="text-[#8BA4B9] no-underline">GitHub</a></p>}
        </div>

        {data.education?.length > 0 && (
          <div className="space-y-[4mm] mb-[10mm]">
            <h3 className="text-[11pt] font-semibold tracking-widest border-b border-[#43596D] pb-[2mm] mb-[4mm]">Education</h3>
            {data.education.map(edu => (
              <div key={edu.id} className="print:break-inside-avoid">
                <p className="font-bold">{edu.degree}</p>
                <p className="text-[#8BA4B9]">{edu.school}</p>
                <p className="text-[8pt] text-[#69849B]">{edu.start_date} - {edu.end_date}</p>
              </div>
            ))}
          </div>
        )}

        {data.skills?.length > 0 && (
          <div className="space-y-[2mm]">
            <h3 className="text-[11pt] font-semibold tracking-widest border-b border-[#43596D] pb-[2mm] mb-[4mm]">Skills</h3>
            {data.skills.map(skill => (
              <div key={skill.id} className="print:break-inside-avoid">
                <p className="font-semibold text-[#8BA4B9]">{skill.category}</p>
                <p className="text-[9pt]">{skill.items}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-[65%] bg-white p-[10mm]">
        {data.personal_summary && (
          <section className="mb-[8mm]">
            <h3 className="text-[14pt] font-bold text-[#2A3B4C] border-b-2 border-[#2A3B4C] pb-[1mm] mb-[3mm]">Profile</h3>
            <p className="text-justify">{data.personal_summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="mb-[8mm]">
            <h3 className="text-[14pt] font-bold text-[#2A3B4C] border-b-2 border-[#2A3B4C] pb-[1mm] mb-[4mm]">Experience</h3>
            <div className="space-y-[6mm]">
              {data.experience.map(exp => (
                <div key={exp.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-[12pt]">{exp.role}</h4>
                    <span className="text-[9pt] font-semibold text-gray-500">{exp.start_date} - {exp.end_date}</span>
                  </div>
                  <div className="text-[10pt] font-medium text-[#4A6FA5] mb-[2mm]">{exp.company} | {exp.location}</div>
                  {exp.details && (
                    <ul className="list-disc pl-[5mm] space-y-[1mm] text-gray-700">
                      {parseBullets(exp.details).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section>
            <h3 className="text-[14pt] font-bold text-[#2A3B4C] border-b-2 border-[#2A3B4C] pb-[1mm] mb-[4mm]">Projects</h3>
            <div className="space-y-[5mm]">
              {data.projects.map(proj => (
                <div key={proj.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-[1mm]">
                    <h4 className="font-bold text-[11pt]">{proj.name}</h4>
                    <span className="text-[9pt] font-semibold text-gray-500">{proj.date}</span>
                  </div>
                  {proj.tech && <div className="text-[9pt] text-[#4A6FA5] font-medium mb-[1mm]">{proj.tech}</div>}
                  {proj.details && (
                    <ul className="list-disc pl-[5mm] space-y-[1mm] text-gray-700 text-[9.5pt]">
                      {parseBullets(proj.details).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications?.length > 0 && (
          <section className="mt-[8mm]">
            <h3 className="text-[14pt] font-bold text-[#2A3B4C] border-b-2 border-[#2A3B4C] pb-[1mm] mb-[4mm]">Certifications</h3>
            <div className="space-y-[4mm]">
              {data.certifications.map(cert => (
                <div key={cert.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-[1mm]">
                    <h4 className="font-bold text-[11pt]">{cert.name}</h4>
                    <span className="text-[9pt] font-semibold text-gray-500">{cert.date}</span>
                  </div>
                  {cert.issuer && <div className="text-[9.5pt] font-medium text-[#4A6FA5] mb-[1mm]">{cert.issuer}</div>}
                  {cert.description && (
                    <p className="text-[9.5pt] text-gray-700 leading-relaxed mt-[1mm]">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernExecutive;
