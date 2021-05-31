import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import TreffenList from '../components/treffen/TreffenList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Code Treffen</title>
        <meta
          name='description'
          content='Get access to a broad range of highly active Code meetups!'
        />
      </Head>
      <TreffenList treffen={props.treffen} />;
    </Fragment>
  );
}


export async function getStaticProps() {
  
  const client = await MongoClient.connect(
    'mongodb+srv://udehnnamdi:We0ZPRksScfRAMjD@cluster0.wlpvc.mongodb.net/codeTreffen?retryWrites=true&w=majority'
);
  const db = client.db();

  const treffenCollection = db.collection('codeTreffen');

  const treffen = await treffenCollection.find().toArray();

  client.close();

  return {
    props: {
      treffen: treffen.map((treff) => ({
        title: treff.title,
        address: treff.address,
        image: treff.image,
        id: treff._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;