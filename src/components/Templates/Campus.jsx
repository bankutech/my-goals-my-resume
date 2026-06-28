import React from 'react';
import { parseBullets, formatUrl } from '../../utils/textUtils';

const Campus = ({ data }) => {
  return (
    <div className="p-[10mm] text-[9.5pt] leading-snug text-black font-sans bg-white min-h-[297mm]">
      {/* Header */}
      <div className="mb-[6mm] flex gap-[4mm]">
        {data.personal_photo && (
          <div className="w-[28mm] h-[35mm] shrink-0 border-[1.5px] border-black overflow-hidden bg-gray-100">
            <img src={data.personal_photo} alt="Profile" className="w-full h-full object-cover grayscale" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[16pt] font-bold uppercase mb-[1mm]">{data.personal_name}</h1>
          {data.personal_title && <div className="text-[10pt] mb-[1mm]">Course : {data.personal_title}</div>}
          <div className="grid grid-cols-[auto_1fr] gap-x-[3mm] text-[9.5pt]">
            {data.personal_email && <><span className="font-semibold">Email</span><span>: {data.personal_email}</span></>}
            {data.personal_phone && <><span className="font-semibold">Mobile</span><span>: {data.personal_phone}</span></>}
            {data.personal_linkedin && <><span className="font-semibold">LinkedIn</span><span>: <a href={data.personal_linkedin} className="text-black no-underline">{formatUrl(data.personal_linkedin)}</a></span></>}
            {data.personal_github && <><span className="font-semibold">GitHub</span><span>: <a href={data.personal_github} className="text-black no-underline">{formatUrl(data.personal_github)}</a></span></>}
            {data.personal_location && <><span className="font-semibold">Location</span><span>: {data.personal_location}</span></>}
          </div>
        </div>
      </div>

      {/* ACADEMIC DETAILS */}
      <div className="border-2 border-black mb-[4mm] print:break-inside-avoid">
        <div className="bg-gray-100 font-bold p-[2mm] border-b-2 border-black uppercase text-[10pt]">Academic Details</div>
        
        {data.education?.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="border-r-2 border-black text-left p-[2mm] uppercase font-bold">Course / Degree</th>
                <th className="border-r-2 border-black text-left p-[2mm] uppercase font-bold">Institute / College</th>
                <th className="border-r-2 border-black text-left p-[2mm] uppercase font-bold">Location</th>
                <th className="text-left p-[2mm] uppercase font-bold">Year</th>
              </tr>
            </thead>
            <tbody>
              {data.education.map((edu, i) => (
                <tr key={edu.id} className={`${i < data.education.length - 1 ? 'border-b border-black' : ''}`}>
                  <td className="border-r-2 border-black p-[2mm]">{edu.degree}</td>
                  <td className="border-r-2 border-black p-[2mm]">{edu.school}</td>
                  <td className="border-r-2 border-black p-[2mm]">{edu.location}</td>
                  <td className="p-[2mm]">{edu.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data.skills?.length > 0 && (
          <div className="border-t-2 border-black">
            {data.skills.map((skill, i) => (
              <div key={skill.id} className={`flex ${i < data.skills.length - 1 ? 'border-b border-black' : ''}`}>
                <div className="w-[40mm] font-bold p-[2mm] border-r-2 border-black shrink-0 flex items-center">{skill.category}</div>
                <div className="p-[2mm] flex-1">{skill.items}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WORK EXPERIENCE */}
      {data.experience?.length > 0 && (
        <div className="border-2 border-black mb-[4mm] print:break-inside-avoid">
          <div className="bg-gray-100 font-bold p-[2mm] border-b-2 border-black uppercase text-[10pt]">Work Experience / Internships</div>
          <div className="p-[2mm] space-y-[3mm]">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold mb-[1mm]">
                  <span className="text-[10pt]">{exp.role}{exp.company && `, ${exp.company}`}</span>
                  <span>{exp.start_date} - {exp.end_date}</span>
                </div>
                {exp.details && (
                  <ul className="list-disc pl-[5mm] space-y-[1mm] marker:text-[8pt]">
                    {parseBullets(exp.details).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <div className="border-2 border-black mb-[4mm] print:break-inside-avoid">
          <div className="bg-gray-100 font-bold p-[2mm] border-b-2 border-black uppercase text-[10pt]">Projects</div>
          <div className="p-[2mm] space-y-[3mm]">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold mb-[1mm]">
                  <span className="text-[10pt]">{proj.name}</span>
                  <span>{proj.date}</span>
                </div>
                {proj.tech && <div className="text-[9pt] italic mb-[1mm] text-gray-800">{proj.tech}</div>}
                {proj.details && (
                  <ul className="list-disc pl-[5mm] space-y-[1mm] marker:text-[8pt]">
                    {parseBullets(proj.details).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <div className="border-2 border-black mb-[4mm] print:break-inside-avoid">
          <div className="bg-gray-100 font-bold p-[2mm] border-b-2 border-black uppercase text-[10pt]">Certifications</div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="border-r-2 border-black text-left p-[2mm] uppercase font-bold w-1/3">Certification</th>
                <th className="border-r-2 border-black text-left p-[2mm] uppercase font-bold w-1/3">Certifying Authority</th>
                <th className="text-left p-[2mm] uppercase font-bold w-1/3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.certifications.map((cert, i) => (
                <tr key={cert.id} className={`${i < data.certifications.length - 1 ? 'border-b border-black' : ''}`}>
                  <td className="border-r-2 border-black p-[2mm]">
                    <div className="font-semibold">{cert.name}</div>
                    {cert.description && <div className="text-[8.5pt] font-normal text-gray-700 mt-[1mm]">{cert.description}</div>}
                  </td>
                  <td className="border-r-2 border-black p-[2mm]">{cert.issuer}</td>
                  <td className="p-[2mm]">{cert.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* PROFILE SUMMARY (Fallback if user fills it) */}
      {data.personal_summary && (
        <div className="border-2 border-black mb-[4mm] print:break-inside-avoid">
          <div className="bg-gray-100 font-bold p-[2mm] border-b-2 border-black uppercase text-[10pt]">Profile Summary</div>
          <div className="p-[2mm] text-justify">
            {data.personal_summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campus;
