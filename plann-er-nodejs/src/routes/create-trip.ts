import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import z from "zod";
import dayjs from "../lib/dayjs";
import { getMailClient } from "../lib/nodemailer";
import { prisma } from "../lib/prisma";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          startsAt: z.coerce.date(),
          endsAt: z.coerce.date(),
          ownerName: z.string(),
          ownerEmail: z.string().email(),
          emailsToInvite: z.array(z.string().email()),
        }),
        response: {
          201: z.object({
            tripId: z.string().uuid(),
          }),
          400: z.object({ message: z.string() }).describe("Bad request"),
        },
      },
    },
    async (request, reply) => {
      const {
        destination,
        startsAt,
        endsAt,
        ownerName,
        ownerEmail,
        emailsToInvite,
      } = request.body;

      if (dayjs(startsAt).isBefore(new Date())) {
        throw new Error("Invalid trip start date.");
      }

      if (dayjs(endsAt).isBefore(startsAt)) {
        throw new Error("Invalid trip end date.");
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          startsAt,
          endsAt,
          participants: {
            createMany: {
              data: [
                {
                  name: ownerName,
                  email: ownerEmail,
                  isOwner: true,
                  isConfirmed: true,
                },
                ...emailsToInvite.map((email) => {
                  return {
                    email,
                  };
                }),
              ],
            },
          },
        },
      });

      const mail = await getMailClient();
      const formattedTripStartDate = dayjs(startsAt).format("D[ de ]MMMM");
      const formattedTripEndDate = dayjs(endsAt).format("D[ de ]MMMM");
      const confirmationLink = new URL(
        `/trips/${trip.id}/confirm`,
        "http://localhost:3333"
      );

      const message = await mail.sendMail({
        from: {
          name: "Equipe plann.er",
          address: "oi@plann.er",
        },
        to: {
          name: ownerName,
          address: ownerEmail,
        },
        subject: `Confirme sua viagem para ${destination} em ${formattedTripStartDate}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de ${formattedTripStartDate} até ${formattedTripEndDate}.</p>
            <p></p>
            <p>Para confirmar sua viagem, clique no link abaixo:</p>
            <p></p>
            <p>
              <a href="${confirmationLink.toString()}">Confirmar viagem</a>
            </p>
            <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
          </div>
        `.trim(),
      });

      console.log(nodemailer.getTestMessageUrl(message));

      return reply.status(201).send({
        tripId: trip.id,
      });
    }
  );
}
