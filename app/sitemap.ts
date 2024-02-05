import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream } from 'fs';
import { resolve } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemapPath = resolve('./public/sitemap.xml');
  
  // Set content type header for the response
  res.setHeader('Content-Type', 'text/xml');

  // Read the sitemap.xml file and pipe it to the response
  const stream = createReadStream(sitemapPath);
  stream.pipe(res);
}