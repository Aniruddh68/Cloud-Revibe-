
import React from 'react';
import { Point } from '../../types';

interface BoardingDroppingPointsProps {
  boardingPoints: Point[];
  droppingPoints: Point[];
  selectedBoardingPoint: Point | null;
  selectedDroppingPoint: Point | null;
  onSelectBoarding: (point: Point) => void;
  onSelectDropping: (point: Point) => void;
}

const PointList: React.FC<{
    title: string;
    points: Point[];
    selectedPoint: Point | null;
    onSelect: (point: Point) => void;
    icon: React.ReactNode;
}> = ({ title, points, selectedPoint, onSelect, icon }) => (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            {icon}
            {title}
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {points.map(point => (
                <button 
                    key={point.id} 
                    onClick={() => onSelect(point)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition flex justify-between items-center ${selectedPoint?.id === point.id ? 'bg-brand-light border-brand-primary' : 'bg-gray-50 border-transparent hover:border-gray-300'}`}
                >
                    <span className="font-medium text-gray-800">{point.name}</span>
                    <span className="font-bold text-brand-primary">{point.time}</span>
                </button>
            ))}
        </div>
    </div>
);

export const BoardingDroppingPoints: React.FC<BoardingDroppingPointsProps> = ({
  boardingPoints,
  droppingPoints,
  selectedBoardingPoint,
  selectedDroppingPoint,
  onSelectBoarding,
  onSelectDropping,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <PointList
        title="Boarding Points"
        points={boardingPoints}
        selectedPoint={selectedBoardingPoint}
        onSelect={onSelectBoarding}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>}
      />
      <PointList
        title="Dropping Points"
        points={droppingPoints}
        selectedPoint={selectedDroppingPoint}
        onSelect={onSelectDropping}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>}
      />
    </div>
  );
};
