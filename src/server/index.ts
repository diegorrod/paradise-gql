import { SERVER_PORT } from './../const';
import { app } from './_express';
import { StartServerGraphQL } from './_serverGrapgQL';

export function StartServer(): void {
  // Preparo Apollo Server
  const server = StartServerGraphQL(app);
  // Inicio el servidor
  app.listen({ port: SERVER_PORT }, () => {
    console.log(`🚀  Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`);
  });
}
