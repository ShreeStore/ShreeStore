import Accordion from './Accordion';

export const metadata = {
  title: "FAQ"
}

export default function Page() {

  return (
    <div className=' min-h-96 px-5 py-10 lg:p-20 flex flex-col bg-primary'>
      <h1 className=' font-bold mb-8 text-3xl'>Frequently Asked Questions (FAQ)</h1>
      <Accordion />
    </div>
  );
}
