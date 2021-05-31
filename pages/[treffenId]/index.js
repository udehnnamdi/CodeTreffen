import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import TreffenDetail from '../../components/treffen/TreffenDetail';

function TreffenDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.treffenData.title}</title>
        <meta name='description' content={props.treffenData.description} />
      </Head>
      <TreffenDetail
        image={props.treffenData.image}
        title={props.treffenData.title}
        address={props.treffenData.address}
        description={props.treffenData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://udehnnamdi:We0ZPRksScfRAMjD@cluster0.wlpvc.mongodb.net/codeTreffen?retryWrites=true&w=majority'
);
  const db = client.db();

  const treffenCollection = db.collection('codeTreffen');

  const treffen = await treffenCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: treffen.map((treff) => ({
      params: { treffenId: treff._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  

  const treffenId = context.params.treffenId;

  const client = await MongoClient.connect(
    'mongodb+srv://udehnnamdi:We0ZPRksScfRAMjD@cluster0.wlpvc.mongodb.net/codeTreffen?retryWrites=true&w=majority'
);
  const db = client.db();

  const treffenCollection = db.collection('codeTreffen');

  const selectedTreffen = await treffenCollection.findOne({
    _id: ObjectId(treffenId),
  });

  client.close();

  return {
    props: {
      treffenData: {
        id: selectedTreffen._id.toString(),
        title: selectedTreffen.title,
        address: selectedTreffen.address,
        image: selectedTreffen.image,
        description: selectedTreffen.description,
      },
    },
  };
}

export default TreffenDetails;