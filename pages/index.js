import Quiz from '../components/quiz';

export default function Home({items}) {
  return (
    <>
      <Quiz items={items} />
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple');
  const data = await response.json();
  return {
    props: {
      items: data.results
    }
  }
}