import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const cards = [
  {
    title: 'Set Peer Review Assignments',
    tone: 'blue',
    points: ['Assign reviewers by team', 'Set rubric and instructions', 'Configure review deadlines']
  },
  {
    title: 'Monitor Collaboration',
    tone: 'green',
    points: ['Track participation metrics', 'Identify inactive groups', 'Review discussion quality']
  },
  {
    title: 'Progress Overview',
    tone: 'orange',
    points: ['Submission completion status', 'Feedback turnaround time', 'Course-level performance view']
  }
];

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div>
          <p className="badge">ADMIN: TEACHER</p>
          <h1>Teacher Control Panel</h1>
        </div>
        <button className="ghost-btn" onClick={logout} type="button">
          Logout
        </button>
      </header>

      <section className="intro-card">
        <h2>Your role in FSAD-PS26</h2>
        <p>Set up peer review assignments and monitor collaboration progress for all student teams.</p>
      </section>

      <section className="grid-cards">
        {cards.map((card) => (
          <FeatureCard key={card.title} title={card.title} points={card.points} tone={card.tone} />
        ))}
      </section>
    </main>
  );
}
