import React, { forwardRef } from 'react';
import ClassicATS from '../Templates/ClassicATS';
import ModernExecutive from '../Templates/ModernExecutive';
import Minimal from '../Templates/Minimal';
import Developer from '../Templates/Developer';
import Campus from '../Templates/Campus';
import Professional from '../Templates/Professional';

const LivePreview = forwardRef(({ data }, ref) => {
  if (!data) return null;

  return (
    <div 
      ref={ref} 
      className={`bg-white w-[210mm] min-h-[297mm] shadow-none print:shadow-none mx-auto overflow-hidden text-black print-document`}
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: 0,
        boxSizing: 'border-box',
        fontFamily: 'Calibri, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      {data.template === 'ClassicATS' && <ClassicATS data={data} />}
      {data.template === 'ModernExecutive' && <ModernExecutive data={data} />}
      {data.template === 'Minimal' && <Minimal data={data} />}
      {data.template === 'Developer' && <Developer data={data} />}
      {data.template === 'Campus' && <Campus data={data} />}
      {data.template === 'Professional' && <Professional data={data} />}
      
      {/* Fallback */}
      {!['ClassicATS', 'ModernExecutive', 'Minimal', 'Developer', 'Campus', 'Professional'].includes(data.template) && <ClassicATS data={data} />}
    </div>
  );
});

export default LivePreview;
