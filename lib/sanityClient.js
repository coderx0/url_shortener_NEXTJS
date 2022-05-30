import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-05-30',
    useCdn: false,
    token:process.env.SANITY_TOKEN
});