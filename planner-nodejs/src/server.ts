import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import type { AddressInfo } from "net";
import { env } from "./env";
import { errorHandler } from "./error-handler";
import { confirmParticipant } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createActivity } from "./routes/create-activity";
import { createInvite } from "./routes/create-invite";
import { createLink } from "./routes/create-link";
import { createTrip } from "./routes/create-trip";
import { fetchActivities } from "./routes/fetch-activities";
import { fetchLinks } from "./routes/fetch-links";
import { fetchParticipants } from "./routes/fetch-participants";
import { getParticipant } from "./routes/get-participant";
import { getTripDetails } from "./routes/get-trip-details";
import { updateTrip } from "./routes/update-trip";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(fetchActivities);
app.register(createLink);
app.register(fetchLinks);
app.register(fetchParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    const { port } = app.server.address() as AddressInfo;

    console.log(`🚀 HTTP server listening on port ${port}`);
  });
