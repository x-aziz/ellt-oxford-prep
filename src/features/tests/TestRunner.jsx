import { useNavigate, useParams } from 'react-router-dom';
import { useTests } from '../../hooks/useTests.js';
import MockExam from '../mocks/MockExam.jsx';
import WritingMockExam from '../mocks/WritingMock.jsx';
import './tests.css';

/**
 * Route: /tests/:testId/:skill   (skill = reading | listening | writing)
 * Looks up which mock the admin attached to that part of the test and opens
 * it directly (no mock list), and sends the student back to the Full Test
 * page when they leave.
 */
export default function TestRunner({ skill }) {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { tests, loading } = useTests();

  if (loading) return <div className="tb-wrap">Loading…</div>;

  const test = tests.find((t) => String(t.id) === String(testId));
  const mockId = test ? test[`${skill}MockId`] : null;
  const exitTo = `/tests/${testId}`;

  if (!test || mockId === null || mockId === undefined || mockId === '') {
    return (
      <div className="tb-wrap">
        <div className="tb-empty">
          This part isn't available yet.{' '}
          <button className="tb-btn" onClick={() => navigate(test ? exitTo : '/')}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (skill === 'writing') return <WritingMockExam mockId={mockId} exitTo={exitTo} />;
  return <MockExam kind={skill} mockId={mockId} exitTo={exitTo} />;
}