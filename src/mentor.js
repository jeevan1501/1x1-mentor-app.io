import React, { useState } from 'react';
import PaymentPage from './payment';

function MentorScheduler({ mentors, setMentors, students, setStudents }) {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [premium, setPremium] = useState(false);

  const handleMentorChange = (mentor) => {
    setSelectedMentor(mentor);
    setSelectedSlot('');
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(parseInt(event.target.value, 10));
  };

  const handlePremiumChange = () => {
    setPremium(!premium);
  };

  const handleSchedule = () => {
    const updatedMentors = mentors.map((mentor) => {
      if (mentor.id === selectedMentor.id) {
        return {
          ...mentor,
          availableSlots: mentor.availableSlots.filter(slot => slot !== selectedSlot),
        };
      }
      return mentor;
    });

    setMentors(updatedMentors);

    const newStudent = {
      mentorId: selectedMentor.id,
      slot: selectedSlot,
      duration: selectedDuration,
      premium,
    };

    setStudents([...students, newStudent]);

    alert('Session scheduled successfully!');
  };

  return (
    <div>
      <h2>Select a Mentor</h2>
      <select onChange={(e) => handleMentorChange(mentors.find(m => m.id === parseInt(e.target.value, 10)))}>
        <option value="">Select...</option>
        {mentors.map((mentor) => (
          <option key={mentor.id} value={mentor.id}>
            {mentor.name} - {mentor.expertise}
          </option>
        ))}
      </select>

      {selectedMentor && (
        <>
          <h3>Available Slots for {selectedMentor.name}</h3>
          <select value={selectedSlot} onChange={(e) => handleSlotChange(e.target.value)}>
            <option value="">Select a slot...</option>
            {selectedMentor.availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <h3>Select Duration</h3>
          <select value={selectedDuration} onChange={handleDurationChange}>
            <option value={30}>30 mins</option>
            <option value={45}>45 mins</option>
            <option value={60}>60 mins</option>
          </select>

          <div>
            <label>
              <input type="checkbox" checked={premium} onChange={handlePremiumChange} />
              Premium Service (Select specific mentor)
            </label>
          </div>

          {selectedSlot && (
            <>
              <PaymentPage duration={selectedDuration} premium={premium} />
              <button onClick={handleSchedule}>Confirm and Schedule</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MentorScheduler;
