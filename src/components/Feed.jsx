import React, { useState, useEffect } from 'react';

const initialMockEvents = [
  {
    id: 1,
    title: 'Free Pizza Night',
    type: 'free food',
    date: 'Today 6pm',
    points: 25,
    image: '🍕',
    attendees: 142,
    description:
      'Free food alert! Join us for unlimited pizza and drinks. First 100 students get a surprise gift!',
    createdBy: 'Admin'
  },
  {
    id: 2,
    title: 'AI Study Group',
    type: 'study',
    date: 'Tomorrow 2pm',
    points: 10,
    image: '📚',
    attendees: 28,
    description:
      'Preparing for Machine Learning exam? Join our study group and ace that test together!',
    createdBy: 'Admin'
  },
  {
    id: 3,
    title: 'Gaming Club Meetup',
    type: 'club',
    date: 'Fri 5pm',
    points: 15,
    image: '🎮',
    attendees: 67,
    description:
      'League of Legends tournament! Sign up your 5-person team. Prizes worth $500 available!',
    createdBy: 'Admin'
  },
  {
    id: 4,
    title: 'Career Workshop',
    type: 'workshop',
    date: 'Wed 3pm',
    points: 20,
    image: '💼',
    attendees: 89,
    description:
      'Learn resume tips and interview skills from industry professionals. Free CV review included!',
    createdBy: 'Admin'
  }
];

export function Feed({ currentUser, setCurrentUser }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState(initialMockEvents);
  const [formData, setFormData] = useState({
    title: '',
    type: 'club',
    date: '',
    time: '',
    points: 10,
    emoji: '🎉',
    description: ''
  });

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleCreateEvent = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.time || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      date: `${formData.date} ${formData.time}`,
      points: parseInt(formData.points),
      image: formData.emoji,
      attendees: 1,
      description: formData.description,
      createdBy: currentUser.name
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Give creator points
    const updatedUser = {
      ...currentUser,
      points: (currentUser.points || 0) + 50
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Reset form
    setFormData({
      title: '',
      type: 'club',
      date: '',
      time: '',
      points: 10,
      emoji: '🎉',
      description: ''
    });
    setShowCreateModal(false);
    alert('Event created! You earned 50 points! 🎉');
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(e => e.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    alert('Event deleted!');
  };

  const handleRSVP = (event) => {
    const updatedUser = { ...currentUser };

    if (!updatedUser.eventsAttended) {
      updatedUser.eventsAttended = [];
    }

    if (updatedUser.eventsAttended.includes(event.id)) {
      updatedUser.eventsAttended = updatedUser.eventsAttended.filter(
        (id) => id !== event.id
      );
      updatedUser.points -= event.points;
    } else {
      updatedUser.eventsAttended.push(event.id);
      updatedUser.points += event.points;
    }

    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const isAttending = (eventId) => currentUser.eventsAttended?.includes(eventId) || false;
  const userEvents = events.filter(e => e.createdBy === currentUser.name);

  return (
    <div>
      <h2 className="feed-title">What's Happening at RMIT?</h2>
      <p className="feed-subtitle">Discover events, study groups, and community activities</p>

      <div className="events-list">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-content">
              <div className="event-header">
                <span className="event-emoji">{event.image}</span>
                <div>
                  <h3 className="event-title">{event.title}</h3>
                </div>
              </div>
              <p className="event-date">📅 {event.date}</p>
              <p className="event-description">{event.description}</p>
              <div className="event-tags">
                <span className="event-tag type">{event.type}</span>
                <span className="event-tag points">+{event.points} pts</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Created by {event.createdBy}
              </p>
            </div>
            <div className="event-sidebar">
              <div className="event-attendees">{event.attendees}</div>
              <div className="event-attendees-label">Going</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRSVP(event);
                }}
                className={`rsvp-btn ${isAttending(event.id) ? 'active' : 'inactive'}`}
              >
                {isAttending(event.id) ? '✓ Going' : 'RSVP'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Created Events */}
      {userEvents.length > 0 && (
        <div className="my-events-section">
          <h3 className="my-events-title">📝 My Events</h3>
          {userEvents.map(event => (
            <div key={event.id} className="user-event-card">
              <div className="user-event-info">
                <h4>{event.image} {event.title}</h4>
                <p>{event.date}</p>
                <p>{event.attendees} people attending</p>
              </div>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="delete-event-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="create-event-btn"
        title="Create Event"
      >
        +
      </button>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div
          className="create-event-modal"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="create-event-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="create-event-header">🎉 Create Event</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="form-section full">
                <div className="form-group">
                  <label className="form-label">Event Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="form-input"
                    placeholder="e.g., Study Group, Meetup, etc."
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="form-input"
                  >
                    <option value="club">Club</option>
                    <option value="study">Study Group</option>
                    <option value="workshop">Workshop</option>
                    <option value="free food">Free Food</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Emoji</label>
                  <input
                    type="text"
                    value={formData.emoji}
                    onChange={(e) =>
                      setFormData({ ...formData, emoji: e.target.value })
                    }
                    className="form-input"
                    placeholder="🎉"
                    maxLength="2"
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Points Reward</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) =>
                      setFormData({ ...formData, points: e.target.value })
                    }
                    className="form-input"
                    min="5"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-section full">
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="form-input"
                    placeholder="Describe your event..."
                    rows="4"
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>
              </div>

              <div className="create-event-footer">
                <button
                  type="submit"
                  className="create"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="modal"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="modal-emoji">{selectedEvent.image}</span>
              <div>
                <h2 className="modal-title">{selectedEvent.title}</h2>
                <p className="modal-date">📅 {selectedEvent.date}</p>
              </div>
            </div>
            <p className="modal-description">{selectedEvent.description}</p>
            <div className="modal-tags">
              <span className="modal-tag type">{selectedEvent.type}</span>
              <span className="modal-tag points">+{selectedEvent.points} pts</span>
              <span className="modal-tag attendees">{selectedEvent.attendees} attending</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Created by {selectedEvent.createdBy}
            </p>
            <div className="modal-buttons">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRSVP(selectedEvent);
                  setSelectedEvent(null);
                }}
                className={`modal-btn ${
                  isAttending(selectedEvent.id) ? 'cancel' : 'confirm'
                }`}
              >
                {isAttending(selectedEvent.id) ? '✓ Going' : 'RSVP Now'}
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="modal-btn cancel"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}