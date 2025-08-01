// components/PoliticianResume.tsx

type ResumeProps = {
  data: {
    name: string;
    office: string;
    contact: { email: string; website: string };
    education: string[];
    experience: string[];
    focus: string[];
    committees: string[];
    statement: string;
    donors: { name: string; amount: number }[];
  };
};

export default function PoliticianResume({ data }: ResumeProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">{data.name}</h1>
      <p className="text-center text-gray-600 mb-6">{data.office}</p>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
          <p>Email: {data.contact.email}</p>
          <p>
            Website:{" "}
            <a href={data.contact.website} className="text-blue-600 underline">
              {data.contact.website}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
          <ul className="list-disc list-inside">
            {data.education.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Professional Experience</h2>
          <ul className="list-disc list-inside">
            {data.experience.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Legislative Focus</h2>
          <ul className="list-disc list-inside">
            {data.focus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Committees</h2>
          <ul className="list-disc list-inside">
            {data.committees.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Public Statements</h2>
          <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4">
            "{data.statement}"
          </blockquote>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Top Donors</h2>
          <ul className="list-disc list-inside">
            {data.donors.map((donor, index) => (
              <li key={index}>
                {donor.name} – ${donor.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
