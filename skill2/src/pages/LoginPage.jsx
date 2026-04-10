import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEMO_USERS = {
  student: { email: 'student@campus.edu', password: 'student123' },
  teacher: { email: 'teacher@campus.edu', password: 'teacher123' }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const helperText = useMemo(() => {
    if (activeRole === 'student') {
      return 'Student can review peers, give feedback, and track project collaboration.';
    }
    return 'Teacher can assign peer reviews and monitor collaboration progress.';
  }, [activeRole]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = DEMO_USERS[activeRole];

    if (formData.email === creds.email && formData.password === creds.password) {
      localStorage.setItem('role', activeRole);
      navigate(`/${activeRole}`);
      return;
    }

    setError('Invalid credentials. Use the demo credentials shown below.');
  };

  const onRoleSwitch = (role) => {
    setActiveRole(role);
    setError('');
    setFormData({ email: '', password: '' });
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-copy">
          <p className="badge">FSAD-PS26</p>
          <h1>Peer Review and Collaboration Platform</h1>
          <p>
            Build project quality through structured peer review, constructive feedback, and team-based
            collaboration.
          </p>
          <p className="helper">{helperText}</p>
        </div>

        <div className="auth-panel">
          <div className="role-toggle">
            <button
              className={activeRole === 'student' ? 'active' : ''}
              onClick={() => onRoleSwitch('student')}
              type="button"
            >
              Student Login
            </button>
            <button
              className={activeRole === 'teacher' ? 'active' : ''}
              onClick={() => onRoleSwitch('teacher')}
              type="button"
            >
              Teacher Login
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && <p className="error-msg">{error}</p>}

            <button className="primary-btn" type="submit">
              Continue as {activeRole === 'student' ? 'Student' : 'Teacher'}
            </button>
          </form>

          <div className="demo-box">
            <p>Demo {activeRole} account</p>
            <code>{DEMO_USERS[activeRole].email}</code>
            <code>{DEMO_USERS[activeRole].password}</code>
          </div>
        </div>
      </section>
    </main>
  );
}
