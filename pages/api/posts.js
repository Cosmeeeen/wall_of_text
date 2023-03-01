import { prisma } from '../../server/db/client';

export default async function handle(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { text } = req.body;
        const post = await prisma.post.create({
          data: {
            text
          }
        });
        res.status(201).json(post);
      } catch (error) {
        console.error(error);
        res.status(500).end(`Could not add post: ${req.body}`);
      }
      break;
    default:
      res.status(405).end(`Method ${method} not allowed`);
  }
}
