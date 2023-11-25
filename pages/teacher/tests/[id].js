import { useRouter } from 'next/router';
import PageBanner from '@/components/Common/PageBanner';

export default function TestPreview({ test }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <PageBanner pageTitle="Test Preview" homePageUrl="/" homePageText="Home" activePageText="Test Preview" />

      <div className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Question</th>
                      <th scope="col">Options</th>
                      <th scope="col">Correct Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {test.Questions.map((question) => (
                      <tr key={question.id}>
                        <td>{question.text}</td>
                        <td>
                          {question.Options.map((option) => (
                            <p key={option.id}>{option.text} {option.isCorrect && "(Correct)"}</p>
                          ))}
                        </td>
                        <td>{question.correctAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { Test, Question, Option } = await import('@/models/index');
  const { id } = ctx.params;

  const test = await Test.findOne({ where: { id: id }, include: [{ model: Question, include: [Option] }] });

  

  if (!test) {
    return {
      notFound: true,
    };
  }

  return { props: { test: JSON.parse(JSON.stringify(test)) } };
}
