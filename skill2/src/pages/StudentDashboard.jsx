import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const cards = [
  {
    title: 'Review Peers Work',
    tone: 'blue',
    points: ['View submitted projects', 'Use rubric-based scoring', 'Track review deadlines']
  },
  {
    title: 'Constructive Feedback',
    tone: 'green',
    points: ['Comment by section', 'Highlight strengths', 'Suggest practical improvements']
  },
  {
    title: 'Project Collaboration',
    tone: 'orange',
    points: ['Team discussion board', 'Task progress updates', 'Shared milestones and activity']
  }
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div>
          <p className="badge">USER: STUDENT</p>
          <h1>Student Collaboration Workspace</h1>
        </div>
        <button className="ghost-btn" onClick={logout} type="button">
          Logout
        </button>
      </header>

      <section className="intro-card">
        <h2>Your role in FSAD-PS26</h2>
        <p>
          Review peers&apos; work, provide constructive feedback, and collaborate on projects to improve
          outcomes.
        </p>
      </section>

      <section className="grid-cards">
        {cards.map((card) => (
          <FeatureCard key={card.title} title={card.title} points={card.points} tone={card.tone} />
        ))}
      </section>
    </main>
  );
}
