import React from 'react'
import { client } from '../lib/sanityClient';

const URLRedirect = () => {

  return (
      <div>Loading</div>
  )
}

export default URLRedirect;
export async function getServerSideProps(context) {
    const { uid } = context.params;
    const query = `*[_type == "pageURL" && _id == '${uid}']{
     urlString
      }`;
    const data = await client.fetch(query);

    return {
        redirect: {
            destination: data[0].urlString,
            permanent: false,
          },
    }
}