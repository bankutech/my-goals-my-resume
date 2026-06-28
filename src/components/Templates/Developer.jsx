import React from 'react';
import { parseBullets, formatUrl } from '../../utils/textUtils';

const Developer = ({ data }) => {
  return (
    <div className="p-[12mm] text-[9.5pt] leading-[1.5] font-mono text-[#24292e]">
      {/* Header */}
      <header className="border-b-2 border-[#e1e4e8] pb-[4mm] mb-[6mm]">
        <h1 className="text-[24pt] font-bold tracking-tight mb-[2mm] text-[#0366d6]">&lt;{data.personal_name?.replace(/\s+/g, '') || 'Developer'} /&gt;</h1>
        <div className="flex flex-wrap gap-x-[4mm] gap-y-[1mm] text-[9pt]">
          {data.personal_title && <span className="text-[#24292e] font-bold">/* {data.personal_title} */</span>}
          {data.personal_email && <span>Email: <a href={`mailto:${data.personal_email}`} className="text-[#0366d6]">{data.personal_email}</a></span>}
          {data.personal_github && <span>GitHub: <a href={data.personal_github} className="text-[#0366d6]">{formatUrl(data.personal_github)}</a></span>}
          {data.personal_linkedin && <span>LinkedIn: <a href={data.personal_linkedin} className="text-[#0366d6]">{formatUrl(data.personal_linkedin)}</a></span>}
        </div>
      </header>

      <div className="flex gap-[6mm]">
        {/* Main Content (Left) */}
        <div className="w-[70%]">
          {data.personal_summary && (
            <section className="mb-[6mm]">
              <h2 className="text-[12pt] font-bold text-[#24292e] mb-[2mm] border-b border-[#e1e4e8] inline-block pr-[4mm]">## About</h2>
              <p className="text-justify">{data.personal_summary}</p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="mb-[6mm]">
              <h2 className="text-[12pt] font-bold text-[#24292e] mb-[3mm] border-b border-[#e1e4e8] inline-block pr-[4mm]">## Experience</h2>
              <div className="space-y-[4mm]">
                {data.experience.map(exp => (
                  <div key={exp.id} className="print:break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[10.5pt] text-[#0366d6]">{exp.company}</h3>
                      <span className="text-[#6a737d]">{exp.start_date} .. {exp.end_date}</span>
                    </div>
                    <div className="font-semibold text-[#24292e] mb-[1mm]">{exp.role}</div>
                    {exp.details && (
                      <ul className="list-none space-y-[1mm]">
                        {parseBullets(exp.details).map((line, i) => (
                          <li key={i} className="flex">
                            <span className="text-[#28a745] mr-[2mm]">-&gt;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects?.length > 0 && (
            <section className="mb-[6mm]">
              <h2 className="text-[12pt] font-bold text-[#24292e] mb-[3mm] border-b border-[#e1e4e8] inline-block pr-[4mm]">## Projects</h2>
              <div className="space-y-[4mm]">
                {data.projects.map(proj => (
                  <div key={proj.id} className="border border-[#e1e4e8] rounded-[3px] p-[3mm] print:break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-[1mm]">
                      <h3 className="font-bold text-[#0366d6] text-[10.5pt]">{proj.name}</h3>
                    </div>
                    {proj.tech && <div className="text-[8.5pt] text-[#d73a49] mb-[2mm]">[{proj.tech}]</div>}
                    {proj.details && (
                      <div className="text-[9pt]">
                        {parseBullets(proj.details).map((line, i) => (
                          <p key={i} className="mb-[1mm]">{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="w-[30%]">
          {data.skills?.length > 0 && (
            <section className="mb-[6mm]">
              <h2 className="text-[12pt] font-bold text-[#24292e] mb-[3mm] border-b border-[#e1e4e8] inline-block pr-[4mm]">## Skills</h2>
              <div className="space-y-[3mm]">
                {data.skills.map(skill => (
                  <div key={skill.id} className="print:break-inside-avoid">
                    <div className="font-bold text-[#0366d6] mb-[1mm]">{skill.category}</div>
                    <div className="flex flex-wrap gap-[1.5mm]">
                      {skill.items.split(',').map((item, i) => (
                        <span key={i} className="bg-[#f6f8fa] border border-[#e1e4e8] px-[2mm] py-[0.5mm] rounded-[2px] text-[8pt] text-[#24292e]">
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education?.length > 0 && (
            <section className="mb-[6mm]">
              <h2 className="text-[12pt] font-bold text-[#24292e] mb-[3mm] border-b border-[#e1e4e8] inline-block pr-[4mm]">## Education</h2>
              <div className="space-y-[3mm]">
                {data.education.map(edu => (
                  <div key={edu.id} className="print:break-inside-avoid">
                    <div className="font-bold text-[#0366d6]">{edu.school}</div>
                    <div className="text-[#24292e]">{edu.degree}</div>
                    <div className="text-[#6a737d] text-[8.5pt]">{edu.start_date} - {edu.end_date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className="mb-[6mm]">
              <h2 className="text-[12pt] font-bold text-[#24292e] mb-[3mm] border-b border-[#e1e4e8] inline-block pr-[4mm]">## Certs</h2>
              <div className="space-y-[3mm]">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="print:break-inside-avoid">
                    <div className="font-bold text-[#0366d6]">{cert.name}</div>
                    {cert.issuer && <div className="text-[#24292e]">{cert.issuer}</div>}
                    <div className="text-[#6a737d] text-[8.5pt] mb-[1mm]">{cert.date}</div>
                    {cert.description && <div className="text-[#24292e] text-[8.5pt]">{cert.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Developer;
