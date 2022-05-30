import { client } from "../../lib/sanityClient";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
    const { urlString } = req.body;
    const id = nanoid(11);
    const doc = {
        _id:id,
        _type: "pageURL",
        urlString:urlString
    }

    const data = await client.create(doc);

    if (data)
        res.status(200).json({ id: id });
    else
        res.status(400).json({ error: "Something wrong happened!" });
}