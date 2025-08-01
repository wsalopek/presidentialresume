// pages/[id].tsx

import PoliticianResume from "../components/PoliticianResume";
import path from "path";
import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";

export default function PoliticianPage({ data }: { data: any }) {
  return <PoliticianResume data={data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const profilesDir = path.join(process.cwd(), "data/profiles");
  const filenames = fs.readdirSync(profilesDir);

  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(".json", "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const filePath = path.join(process.cwd(), "data/profiles", `${id}.json`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContent);

  return {
    props: {
      data,
    },
  };
};
