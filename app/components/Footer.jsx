

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
<p>all work © brendan george ko, 2008 - {currentYear}.</p>
    </footer>
  );
}
