import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { ClientError } from "../errors/client-error";
import { prisma } from "../lib/prisma";

export async function createLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/links",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),
          url: z.string().url(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { title, url } = request.body;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new ClientError("Trip not found.");
      }

      const link = await prisma.link.findUnique({
        where: {
          url,
        },
      });

      if (link) {
        throw new ClientError("Link already exists.");
      }

      const newLink = await prisma.link.create({
        data: {
          title,
          url,
          tripId,
        },
      });

      return reply.status(201).send({
        linkId: newLink.id,
      });
    }
  );
}