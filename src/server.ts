import factory from './common/core/factory.ts';
import { port } from './common/core/utils.ts';
import router from './routes.ts';

await factory({
  router: router,
}).listen({ port });
