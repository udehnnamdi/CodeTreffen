import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewTreffenForm from '../../components/treffen/NewTreffenForm';

function NewTreffenPage() {
  const router = useRouter();

  async function addTreffenHandler(enteredTreffenData) {
    const response = await fetch('/api/new-treffen', {
      method: 'POST',
      body: JSON.stringify(enteredTreffenData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Treffen</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <NewTreffenForm onAddTreffen={addTreffenHandler} />
    </Fragment>
  );
}

export default NewTreffenPage;