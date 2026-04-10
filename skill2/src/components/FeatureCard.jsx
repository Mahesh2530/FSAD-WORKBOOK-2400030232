export default function FeatureCard({ title, points, tone = 'blue' }) {
  return (
    <article className={`feature-card ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
