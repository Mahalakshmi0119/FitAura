import React, { useState } from 'react';
import { addWorkout } from '../Services/WorkoutService';

const AddWorkout = ({ onWorkoutAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    duration: '',
    intensity: '',
    motivationQuote: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addWorkout({
        title: formData.title,
        type: formData.type,
        duration: Number(formData.duration),
        intensity: formData.intensity,
        motivationQuote: formData.motivationQuote,
        notes: formData.notes,
      });

      setFormData({
        title: '',
        type: '',
        duration: '',
        intensity: '',
        motivationQuote: '',
        notes: '',
      });

      onWorkoutAdded(); // refresh dashboard
    } catch (error) {
      console.error("Add workout failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add Workout</h3>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      assume
      <br />

      <input
        name="type"
        placeholder="Type (cardio/strength)"
        value={formData.type}
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="duration"
        type="number"
        placeholder="Duration (mins)"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="intensity"
        placeholder="Intensity (low/medium/high)"
        value={formData.intensity}
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="motivationQuote"
        placeholder="Motivation quote"
        value={formData.motivationQuote}
        onChange={handleChange}
      />
      <br />

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />
      <br />

      <button type="submit">Add Workout</button>
    </form>
  );
};

export default AddWorkout;

