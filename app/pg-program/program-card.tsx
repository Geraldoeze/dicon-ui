"use client"
import { useState } from 'react';



interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const [selectedDegree, setSelectedDegree] = useState<string>(program.degrees[0].level);
  
  const activeDegree = program.degrees.find(d => d.level === selectedDegree);

  return (
    <div className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className='border-b-2 md:border-e-2 md:border-b-0 border-gray-300 px-4'>
          <h2 className="text-xl font-bold mb-4">{program.name}</h2>
          
          {/* Degree Level Selection */}
          <div className="mb-4 flex justify-between items-center flex-col md:flex-row">
            <h3 className="text-gray-700 mb-2 hidden md:block">Degree level</h3>
            <div className="flex gap-2">
              {program.degrees.map((degree) => (
                <button
                  key={degree.level}
                  onClick={() => setSelectedDegree(degree.level)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors duration-200
                    ${selectedDegree === degree.level
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {degree.level}
                </button>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-gray-700 mb-2">Courses</h3>
            <ul className="space-y-2">
              {program.courses.map((course, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-600">{course}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Requirements */}
        {activeDegree && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Admission Requirements</h3>
              <span className="text-blue-700">{activeDegree.gpa}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {activeDegree.requirements}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;